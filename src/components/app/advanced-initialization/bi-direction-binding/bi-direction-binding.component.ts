import {Component, Inject, OnInit} from "@angular/core";
import {ICustomerService} from "../../../../interfaces/customer-service.interface";
import {Response} from '@angular/http';

@Component({
  selector: 'bi-direction-binding',
  templateUrl: 'bi-direction-binding.component.html'
})

export class BiDirectionBindingComponent implements OnInit {

  //#region Properties

  /*
  * Customers list which should be bound to ngx-multi-selector.
  * */
  private customers: Array<any>;

  /*
  * List of chosen customers.
  * */
  private chosen: any;

  //#endregion

  //#region Constructor

  /*
  * Initiate component with default settings.
  * */
  public constructor(@Inject('ICustomerService') public customerService: ICustomerService) {
    this.chosen = {
      first: [],
      second: [],
      inherit: {
        parent: [],
        child: []
      }
    }

  }

  //#endregion

  //#region Methods

  /*
  * Callback which should be raised when component has been initiated successfully.
  * */
  public ngOnInit(): void {
    // Load the list of customers.
    this.customerService.getCustomers().then((x: Response) => {
      this.customers = x.json();
    });
  };

  //#endregion
}
