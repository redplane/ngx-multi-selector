import {Component, Inject, OnInit} from '@angular/core';
import {ICustomerService} from '../../../interfaces/customer-service.interface';

@Component({
  selector: 'advanced-demo-toggle-option',
  templateUrl: 'toggle-option.component.html'
})

export class ToggleOptionComponent implements OnInit {

  //#region Properties

  public options: any;

  /*
  * List of customers.
  * */
  public customers: Array<any>;

  /*
  * List of chosen items.
  * */
  public selectedCustomers: Array<any>;

  /*
  * Whether customers list has been loaded or not.
  * */
  public hasCustomersListLoaded = false;

  //#endregion

  //#region Constructor

  /*
  * Initiate component successfully.
  * */
  public constructor(@Inject('ICustomerService') public customerService: ICustomerService) {
    this.options = {
      bClearButtonAvailable: false,
      bSearchBoxAvailable: false,
      limitItemAmount: 5,
      placeholderSearchDropDown: '',
      placeholderTitleDropDown: '',
      separationCharacter: ' - ',
      bDisabled: false,
      interval: 250
    };

    this.selectedCustomers = [];
  }

  //#endregion

  //#region Methods

  /*
  * Callback which is called when component has been initiated successfully.
  * */
  public ngOnInit(): void {
    // Load customers.
    this.customerService
      .loadCustomersAsync()
      .subscribe(customers => {
        this.customers = customers;
        this.hasCustomersListLoaded = true;
      });
  }

  //#endregion

}
