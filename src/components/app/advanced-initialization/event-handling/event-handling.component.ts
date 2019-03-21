import {Component, Inject, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {ICustomerService} from '../../../../interfaces/customer-service.interface';
import {SearchCustomerViewModel} from '../../../../view-models/search-customer.view-model';

@Component({
  selector: 'event-handling',
  templateUrl: 'event-handling.component.html'
})

export class EventHandlingComponent implements OnInit {

  //#region Properties

  /*
  * Original list of customers to be selected.
  * */
  private customers: Array<any>;

  /*
  * List of customers which is obtained from API service.
  * */
  private apiCustomers: Array<any>;

  /*
  * List of chosen customers.
  * */
  private chosenCustomers: Array<any>;

  /*
  * List of chosen customers.
  * */
  private apiChosenCustomers: Array<any>;

  /*
  * List of customers which should be displayed inside multi selector.
  * */
  private filteredCustomers: Array<any>;

  //#endregion

  //#region Constructor

  /*
  * Initiate component with injectors.
  * */
  public constructor(@Inject('ICustomerService') public customerService: ICustomerService) {
    this.chosenCustomers = [];
  }

  //#endregion

  //#region Methods

  /*
  * Callback which should be raised when component has been initiated.
  * */
  public ngOnInit(): void {
    this.customerService.getCustomers().then((x: Response) => {
      this.customers = x.json();
      this.filteredCustomers = this.customers;
      this.apiCustomers = this.customers;
    });
  };

  /*
  * Callback which should be fired when ngx-multi-selector starts searching for input data.
  * This part is used for api querying or local data filter.
  * */
  public search(keyword: string): void {
    if (!keyword || keyword.length < 1) {
      this.filteredCustomers = this.customers;
      return;
    }

    this.filteredCustomers = this.customers.filter((x: any) => {
      let szUpperCasedKeyword = keyword.toUpperCase();
      return (x.firstName && x.firstName.toUpperCase().indexOf(szUpperCasedKeyword) !== -1);
    })
  };

  /*
  * Callback which is raised when multi selector starts requesting api service.
  * */
  public apiSearch(keyword: string): void {

    let conditions = new SearchCustomerViewModel();
    if (keyword)
      conditions.firstNames = [keyword];

    this.customerService.getApiCustomers(conditions).then((x: Response) => {
      this.apiCustomers = x.json();
    })
  };

  /*
  * Delete a customer from chosen customers list.
  * */
  public deleteCustomer(customer: any): void {
    debugger;
    if (!customer)
      return;

    let iIndex = this.apiChosenCustomers.indexOf(customer);
    if (iIndex === -1)
      return;

    this.apiChosenCustomers.splice(iIndex, 1);
  };

  //#endregion
}
