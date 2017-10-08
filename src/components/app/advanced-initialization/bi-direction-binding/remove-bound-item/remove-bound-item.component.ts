import {Component, Inject, OnInit} from "@angular/core";
import {ICustomerService} from "../../../../../interfaces/customer-service.interface";
import {Response} from '@angular/http';

@Component({
  selector: 'remove-bound-item',
  templateUrl: 'remove-bound-item.component.html'
})

export class RemoveBoundItemComponent implements OnInit {

  //#region Properties

  /*
  * List of customers to be selected.
  * */
  private customers: Array<any>;

  /*
  * List of chosen customers.
  * */
  private chosenCustomers: Array<any>;

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
  * Callback which should be raised when component has been initiated successfully.
  * */
  public ngOnInit(): void {
    this.customerService.getCustomers().then((x: Response) => {
      this.customers = x.json();
    })
  }

  /*
  * Remove customer from chosen list.
  * */
  public deleteCustomer(customer: any): void{
    let iIndex = this.chosenCustomers.indexOf(customer);
    if (iIndex === -1)
      return;

    this.chosenCustomers.splice(iIndex, 1);
  };

  //#endregion

}
