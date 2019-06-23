import {Component, Inject, OnInit} from "@angular/core";
import {ICustomerService} from "../../../interfaces/customer-service.interface";

@Component({
  selector: 'advanced-demo-data-source',
  templateUrl: 'data-source.component.html'
})

export class DataSourceComponent implements OnInit{

  //#region Properties

  // List of customers.
  public customers: Array<any>;

  /*
  * Whether customers list has been loaded or not.
  * */
  public hasCustomersListLoaded: boolean;

  //#endregion

  //#region Constructor

  /*
  * Initiate component.
  * */
  public constructor(@Inject('ICustomerService') public customerService: ICustomerService){

  }

  //#endregion

  //#region Methods

  /*
  * Called when component has been initiated successfully.
  * */
  public ngOnInit(): void {
    // Get customers list.
    this.customerService
      .loadCustomersAsync()
      .subscribe(customers => {

        this.customers = customers;
        this.hasCustomersListLoaded = true;
      });
  }

  //#endregion
}
