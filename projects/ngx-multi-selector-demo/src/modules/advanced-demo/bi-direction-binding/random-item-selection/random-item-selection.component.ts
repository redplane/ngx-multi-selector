import {Component, Inject, OnInit} from '@angular/core';
import {ICustomerService} from '../../../../interfaces/customer-service.interface';
import {Customer} from '../../../../models/customer';

@Component({
  selector: 'random-item-selection',
  templateUrl: 'random-item-selection.component.html'
})

export class RandomItemSelectionComponent implements OnInit {

  //#region Properties

  private _customers: Array<Customer>;

  private _selectedCustomers: Array<Customer>;

  /*
  * Whether customers list has been loaded or not.
  * */
  protected hasCustomersListLoaded = false;

  //#endregion

  //#region Accessors

  /*
  * Original list of customers to be selected.
  * */
  protected set customers(values: Array<Customer>) {
    if (!values || !values.length) {
      this._customers = [];
      return;
    }

    this._customers = values;
  }

  /*
  * Get the list of loaded customers.
  * */
  protected get customers(): Array<Customer> {
    return this._customers;
  }

  /*
  * Set the selected customers.
  * */
  protected set selectedCustomers(values: Array<Customer>) {
    if (!values || !values.length) {
      this._selectedCustomers = [];
      return;
    }

    this._selectedCustomers = values;
  }

  /*
  * Get the selected customers.
  * */
  protected get selectedCustomers(): Array<Customer> {
    return this._selectedCustomers;
  }

  /*
  * Whether any customer has been selected or not.
  * */
  protected get hasCustomerSelected(): boolean {

    if (!this.selectedCustomers || !this.selectedCustomers.length) {
      return false;
    }

    return true;
  }

  //#endregion

  //#region Constructor

  /*
  * Initiate component with injectors.
  * */
  public constructor(@Inject('ICustomerService') public customerService: ICustomerService) {

  }

  //#endregion

  //#region Methods

  /*
  * Callback which is fired when component has been initiated successfully.
  * */
  public ngOnInit(): void {

    this.customerService
      .loadCustomersAsync()
      .subscribe(customers => {
        this.customers = customers;
        this.hasCustomersListLoaded = true;
      });
  }

  /*
  * Generate a list of chosen items.
  * */
  public clickSelectRandomCustomer(): void {

    // Customers haven't been loaded.
    if (!this.hasCustomersListLoaded) {
      return;
    }

    // No customer is loaded.
    const customers = this.customers;
    if (!customers || !customers.length) {
      return;
    }

    let iCustomersListLength = customers.length;
    let iRandom = Math.floor((Math.random() * iCustomersListLength) + 1);

    // Clear the second chosen list.
    const selectedCustomers = [];
    selectedCustomers.push(customers[iRandom]);

    this.selectedCustomers = selectedCustomers;
  }

  //#endregion

}
