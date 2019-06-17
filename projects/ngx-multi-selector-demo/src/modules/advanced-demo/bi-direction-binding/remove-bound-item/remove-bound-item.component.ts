import {Component, Inject, OnInit} from '@angular/core';
import {ICustomerService} from '../../../../interfaces/customer-service.interface';
import {Customer} from '../../../../models/customer';

@Component({
  selector: 'remove-bound-item',
  templateUrl: 'remove-bound-item.component.html'
})

export class RemoveBoundItemComponent implements OnInit {

  //#region Properties

  /*
  * List of customers to be selected.
  * */
  protected customers: Array<any>;

  /*
  * List of chosen customers.
  * */
  protected selectedCustomers: Array<Customer>;

  /*
  * Whether customers list has been loaded.
  * */
  protected hasCustomersListLoaded: boolean;

  //#endregion

  //#region Constructor

  /*
  * Initiate component with injectors.
  * */
  public constructor(@Inject('ICustomerService') public customerService: ICustomerService) {
    this.selectedCustomers = [];
  }

  //#endregion

  //#region Methods

  /*
  * Callback which should be raised when component has been initiated successfully.
  * */
  public ngOnInit(): void {
    this.customerService
      .loadCustomersAsync()
      .subscribe(customers => {
        this.customers = customers;
        this.hasCustomersListLoaded = true;
      })
  }

  /*
  * Remove customer from chosen list.
  * */
  public deleteCustomer(customer: any): void {

    const selectedCustomers = this.selectedCustomers;

    if (!selectedCustomers || !selectedCustomers.length) {
      return;
    }

    let iIndex = selectedCustomers.indexOf(customer);
    if (iIndex === -1)
      return;

    this.selectedCustomers.splice(iIndex, 1);
  };

  //#endregion

}
