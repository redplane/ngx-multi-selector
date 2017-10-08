import {Response} from "@angular/http";
import {SearchCustomerViewModel} from "../view-models/search-customer.view-model";

export interface ICustomerService{

  //#region Methods

  /*
  * Get list of customers.
  * */
  getCustomers(): Promise<Response>;

  /*
  * Simulate customers filter API.
  * */
  getApiCustomers(conditions: SearchCustomerViewModel): Promise<Response>;

  //#endregion
}
