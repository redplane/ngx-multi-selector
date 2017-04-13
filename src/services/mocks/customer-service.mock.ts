import {ICustomerService} from "../../interfaces/customer-service.interface";
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomerServiceMock implements ICustomerService {

  public constructor(public http: Http){

  }

  getCustomers(): Promise<Response> {
    return this.http.get("http://northwind.servicestack.net/customers.json").toPromise();
  }

}
