import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ICustomerService} from '../../../../interfaces/customer-service.interface';
import {Customer} from '../../../../models/customer';
import {NgxMultiSelectorComponent} from '../../../../../../ngx-multi-selector/src/lib/ngx-multi-selector.component';

@Component({
  selector: 'remove-bound-item',
  templateUrl: 'remove-bound-item.component.html'
})

export class RemoveBoundItemComponent implements OnInit {

  //#region Properties

  @ViewChild('ngxMultiSelectorComponent', {static: false})
  public ngxMultiSelectorComponent: NgxMultiSelectorComponent;

  /*
  * List of customers to be selected.
  * */
  public customers: Array<any>;

  /*
  * List of chosen customers.
  * */
  public selectedCustomers: Array<Customer>;

  /*
  * Whether customers list has been loaded.
  * */
  public hasCustomersListLoaded: boolean;

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
    if (!this.ngxMultiSelectorComponent) {
      return;
    }

    this.ngxMultiSelectorComponent
      .deleteSelectedValue(customer);
  }

  //#endregion

}
