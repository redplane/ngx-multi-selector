import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ICustomerService} from '../../../interfaces/customer-service.interface';
import {Customer} from '../../../models/customer';
import {NgxMultiSelectorComponent} from '../../../../../ngx-multi-selector/src/lib/ngx-multi-selector.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'event-handling',
  templateUrl: 'event-handling.component.html'
})

export class EventHandlingComponent implements OnInit {

  //#region Properties

  @ViewChild('offlineCustomersSelector', {static: false})
  private readonly offlineCustomersSelector: NgxMultiSelectorComponent;

  /*
  * Original list of customers to be selected.
  * */
  private customers: Array<Customer>;

  /*
  * List of customers which is obtained from API service.
  * */
  protected selectedApiCustomers: Array<Customer>;

  /*
  * List of chosen customers.
  * */
  protected localSelectedValues: Array<number>;

  /*
  * List of chosen customers.
  * */
  private apiChosenCustomers: Array<Customer>;

  /*
  * List of customers which should be displayed inside multi selector.
  * */
  protected filteredCustomers: Array<Customer>;

  //#endregion

  //#region Constructor

  /*
  * Initiate component with injectors.
  * */
  public constructor(@Inject('ICustomerService') public customerService: ICustomerService) {
    this.localSelectedValues = [];
  }

  //#endregion

  //#region Methods

  /*
  * Callback which should be raised when component has been initiated.
  * */
  public ngOnInit(): void {
    this.customerService.loadCustomersAsync()
      .subscribe((customers: Customer[]) => {

        this.customers = customers;
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

    // let conditions = new SearchCustomerViewModel();
    // if (keyword)
    //   conditions.firstNames = [keyword];
    //
    // this.customerService.getApiCustomers(conditions).then((x: Response) => {
    //   this.apiCustomers = x.json();
    // })
  };

  /*
  * Delete a customer from chosen customers list.
  * */
  public deleteSelectedCustomerId(id: number): void {
    this.offlineCustomersSelector
      .deleteSelectedValue(id);
  };

  public loadAvailableItemsAsync = (keyword: string): Observable<Customer[]> => {
    return this.customerService
      .loadCustomersAsync(keyword);
  }

  //#endregion
}
