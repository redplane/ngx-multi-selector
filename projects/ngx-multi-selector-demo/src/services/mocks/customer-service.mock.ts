import {ICustomerService} from '../../interfaces/customer-service.interface';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../../models/customer';
import {map} from 'rxjs/operators';

@Injectable()
export class CustomerServiceMock implements ICustomerService {

  //#region Constructor

  /*
  * Initiate service with injectors.
  * */
  public constructor(protected httpClient: HttpClient) {

  }

  //#endregion

  //#region Methods

  /*
  * Load customers asynchronously.
  * */
  public loadCustomersAsync(keyword?: string): Observable<Customer[]> {

    // Load customers list.
    return this.httpClient
      .get('/assets/data/customers.json')
      .pipe(
        map((customers: Customer[]) => {

          // Keyword is defined.
          if (keyword && keyword.length > 0) {
            return customers.filter(customer => {
              const fullName = `${customer.firstName} ${customer.lastName}`.toUpperCase();
              const upperCasedKeyword = keyword.toUpperCase();

              return fullName.indexOf(upperCasedKeyword) !== -1;
            })
          }

          return customers;
        })
      )
  }

  //#endregion
}
