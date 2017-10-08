import {ICustomerService} from "../../interfaces/customer-service.interface";
import {Http, Response, ResponseOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import {SearchCustomerViewModel} from "../../view-models/search-customer.view-model";

@Injectable()
export class CustomerServiceMock implements ICustomerService {

  //#region Properties

  /*
  * List of customers.
  * */
  private customers: Array<any>;

  //#endregion

  //#region Constructor

  /*
  * Initiate service with injectors.
  * */
  public constructor(public http: Http) {
    this.customers = [
      {
        "id": 1,
        "firstName": "Howey",
        "lastName": "Connock"
      },
      {
        "id": 2,
        "firstName": "Sibylle",
        "lastName": "Zettler"
      },
      {
        "id": 3,
        "firstName": "Kyrstin",
        "lastName": "Posen"
      },
      {
        "id": 4,
        "firstName": "Amelie",
        "lastName": "Southam"
      },
      {
        "id": 5,
        "firstName": "Karleen",
        "lastName": "Bedburrow"
      },
      {
        "id": 6,
        "firstName": "Natty",
        "lastName": "Sigfrid"
      },
      {
        "id": 7,
        "firstName": "Kenny",
        "lastName": "d' Eye"
      },
      {
        "id": 8,
        "firstName": "Horatia",
        "lastName": "Lorent"
      },
      {
        "id": 9,
        "firstName": "Melesa",
        "lastName": "Inglesent"
      },
      {
        "id": 10,
        "firstName": "Gerhardine",
        "lastName": "Wigfall"
      }];
  }

  //#endregion

  //#region Methods

  /*
  * Get customers list.
  * */
  public getCustomers(): Promise<Response> {

    let options = new ResponseOptions();
    options.status = 200;
    options.body = this.customers;
    return Promise.resolve(new Response(options));
  }

  /*
  * Simulate customer query API.
  * */
  public getApiCustomers(conditions: SearchCustomerViewModel): Promise<Response> {
    let filteredCustomers = Object.assign([], this.customers);

    // Indexes have been defined.
    if (conditions.ids && conditions.ids.length > 0) {
      filteredCustomers = filteredCustomers.filter((x: any) => {
        return conditions.ids.indexOf(x.id) !== -1;
      });
    }

    // First names have been defined.
    if (conditions.firstNames && conditions.firstNames.length > 0) {
      let lowerCasedFirstNames = conditions.firstNames.map((x: string) => {
        return x.toLowerCase();
      });
      filteredCustomers = filteredCustomers.filter((x: any) => {
        return lowerCasedFirstNames.indexOf(x.firstName.toLowerCase()) !== -1;
      });
    }

    if (conditions.lastNames && conditions.lastNames.length > 0) {
      let loweredCasedLastNames = conditions.lastNames.map((x: string) => {
        return x.toLowerCase();
      });

      filteredCustomers = filteredCustomers.filter((x: any) => {
        return loweredCasedLastNames.indexOf(x.lastName) !== -1;
      });
    }

    let options = new ResponseOptions();
    options.status = 200;
    options.body = filteredCustomers;
    return Promise.resolve(new Response(options));
  };

  //#endregion
}
