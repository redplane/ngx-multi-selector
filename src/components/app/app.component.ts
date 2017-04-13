import {Component, Inject, OnInit} from '@angular/core';
import {ICustomerService} from "../../interfaces/customer-service.interface";
import {Response} from "@angular/http";
import {Customer} from "../../models/customer";
import {GetCustomerResult} from "../../models/get-customer";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  // List of items which should be shown up in the multi selector.
  private customers: Array<Customer>;


  public constructor(@Inject("ICustomerService") public customerService: ICustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getCustomers()
      .then((x: Response) => {
        let result = <GetCustomerResult> x.json();
        this.customers = result.Customers;
      });
  }

  public searchItem(keyword: string): void {
    this.customerService.getCustomers()
      .then((x: Response) => {
        let result = <GetCustomerResult> x.json();
        let customers = result.Customers;

        this.customers = customers.filter((x: Customer) => {
          return x.ContactName.toLowerCase().indexOf(keyword.toLowerCase()) != -1;
        });
      });
  }
}
