import {Component, Inject, OnInit} from '@angular/core';
import {ICustomerService} from '../../../../interfaces/customer-service.interface';
import {Customer} from '../../../../models/customer';

@Component({
  selector: 'inherit-selection',
  templateUrl: 'inherit-selection.component.html'
})

export class InheritSelectionComponent implements OnInit {

  //#region Properties

  /*
  * List of customers to be selected.
  * */
  public _originalItems: Array<Customer>;

  /*
  * List of selected parent items.
  * */
  public _selectedParentItems: Array<Customer>;

  /*
  * List of items in child selector.
  * */
  public _selectChildItems: Array<Customer>;

  /*
  * Whether customers list has been loaded or not.
  * */
  public hasCustomersListLoaded = false;

  //#endregion

  //#region Accessors

  /*
  * List of customers in the module.
  * */
  public get originalItems(): Array<Customer> {
    return this._originalItems;
  }

  /*
  * Update customers list.
  * */
  public set originalItems(values: Array<Customer>) {

    if (!values || !values.length) {
      this._originalItems = [];
      return;
    }

    this._originalItems = values;
  }

  /*
  * Get the parent's selected items.
  * */
  public get selectedParentItems(): Array<Customer> {
    return this._selectedParentItems;
  }

  /*
  * Set the parent selected items.
  * */
  public set selectedParentItems(values: Customer[]) {
    if (!values || !values.length) {
      this._selectedParentItems = [];
      return;
    }

    this._selectedParentItems = values;
  }

  /*
  * Get child's selected items.
  * */
  public get selectedChildItems(): Customer[] {
    return this._selectChildItems;
  }

  /*
  * Set child's selected items.
  * */
  public set selectedChildItems(values: Customer[]) {
    if (!this._selectChildItems) {
      this._selectChildItems = [];
      return;
    }

    this._selectChildItems = values;
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
  * Callback which should be raised when component has been initiated successfully.
  * */
  public ngOnInit(): void {
    this.customerService
      .loadCustomersAsync()
      .subscribe(customers => {
        this.originalItems = customers;
        this.hasCustomersListLoaded = true;
      });
  }

  /*
  * Load parent items placeholder.
  * */
  public loadParentItemsPlaceholder(): string {

    if (!this.hasCustomersListLoaded) {
      return 'Loading customers...';
    }

    return 'Please select one parent item...';
  }

  /*
  * Load child items placeholder.
  * */
  public loadChildItemsPlaceholder(): string {
    if (!this.hasCustomersListLoaded) {
      return 'Loading customers...';
    }

    return 'Please select one child items...';
  }

  //#endregion
}
