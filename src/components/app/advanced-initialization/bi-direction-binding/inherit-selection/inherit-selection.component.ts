import {Component, Inject, OnInit} from "@angular/core";
import {ICustomerService} from "../../../../../interfaces/customer-service.interface";
import {Response} from '@angular/http';

@Component({
  selector: 'inherit-selection',
  templateUrl: 'inherit-selection.component.html'
})

export class InheritSelectionComponent implements OnInit {

  //#region Properties

  /*
  * List of customers to be selected.
  * */
  private customers: Array<any>;

  /*
  * List of items in parent selector.
  * */
  private parent: Array<any>;

  /*
  * List of items in child selector.
  * */
  private child: Array<any>;

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
    this.parent = [];
    this.child = [];
  }

  //#endregion

  //#region Methods

  /*
  * Callback which should be raised when component has been initiated successfully.
  * */
  public ngOnInit(): void {
    this.customerService.getCustomers().then((x: Response) => {
      this.customers = x.json();
    });
  }

  //#endregion
}
