import {Observable} from 'rxjs';
import {Customer} from '../models/customer';

export interface ICustomerService{

  //#region Methods

  /*
  * Load a list of customers asynchronously.
  * */
  loadCustomersAsync(keyword?: string): Observable<Customer[]>;

  //#endregion
}
