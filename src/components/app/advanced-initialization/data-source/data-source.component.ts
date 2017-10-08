import {Component, Inject, OnInit} from "@angular/core";
import {ICustomerService} from "../../../../interfaces/customer-service.interface";
import {Response} from '@angular/http';

@Component({
  selector: 'advanced-initialization-toggle-option',
  templateUrl: 'data-source.component.html'
})

export class DataSourceComponent implements OnInit{



  //#region Properties

  // List of customers.
  private customers: Array<any>;

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
    this.customerService.getCustomers().then((x: Response) =>{
      this.customers = x.json();
    })
  }

  //#endregion
}
