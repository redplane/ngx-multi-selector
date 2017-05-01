import {Component, Inject, Input, OnInit} from '@angular/core';
import {ICustomerService} from "../../interfaces/customer-service.interface";
import {Response} from "@angular/http";
import {Customer} from "../../models/customer";
import {GetCustomerResult} from "../../models/get-customer";
import {IApiService} from "../../interfaces/api-service.interface";
import {ParameterSearchResult} from "../../models/parameter-search-result";
import {InputParameter} from "../../models/input-parameter";
import {OutputParameter} from "../../models/output-parameter";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  //#region Properties

  // List of selected item.
  private items: Array<Customer>;

  // List of items which should be shown up in the multi selector.
  private customers: Array<Customer>;

  // Input & output parameters search result.
  private result: ParameterSearchResult;

  //#endregion

  //#region Constructor

  public constructor(@Inject("ICustomerService") public customerService: ICustomerService,
                     @Inject("IApiService") public apiService: IApiService) {

    this.items = new Array<Customer>();
    this.result = new ParameterSearchResult();
    this.result.inputs = new Array<InputParameter>();
    this.result.outputs = new Array<OutputParameter>();
  }

  //#endregion

  //#region Methods

  // This callback is fired when component has been initialized.
  ngOnInit(): void {

    // Load the list of api.
    this.apiService.getApis()
      .then((x: Response) => {
        this.result = <ParameterSearchResult> x.json();
      });

    this.customerService.getCustomers()
      .then((x: Response) => {
        let result = <GetCustomerResult> x.json();
        this.customers = result.Customers;
      });
  }

  // This callback is fired when ng2-multi-drop-down-selector raises an event to make another components notice about its change.
  public searchItem(keyword: string): void {
    this.customerService.getCustomers()
      .then((x: Response) => {
        let result = <GetCustomerResult> x.json();
        let customers = result.Customers;

        this.customers = customers.filter((x: Customer) => {
          return x.ContactName.toLowerCase().indexOf(keyword.toLowerCase()) != -1;
        });
      });
  }

  // This callback is fired when items list is updated.
  public updateCustomers(items: Array<Customer>): void {
    // Update selected items list.
    this.items = items;

    console.log('update');
  }

  //#endregion

  //#endregion
}
