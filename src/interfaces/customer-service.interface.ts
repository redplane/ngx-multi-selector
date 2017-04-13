import {Response} from "@angular/http";

export interface ICustomerService{

  // Get list of customers.
  getCustomers(): Promise<Response>;

}
