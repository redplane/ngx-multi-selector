import {Component, Inject, OnInit} from '@angular/core';
import {ICustomerService} from '../../interfaces/customer-service.interface';

@Component({
  selector: 'basic-initialization',
  templateUrl: 'basic-demo.component.html'
})

export class BasicDemoComponent implements OnInit {

  //#region Properties

  // List of customers.
  public customers: Array<any>;

  // List of chosen customer.
  public chosenCustomers: Array<any> = [];

  /*
  * Whether customers list has been loaded or not.
  * */
  public hasCustomersListLoaded: boolean;

  /*
  * Basic demo source code.
  * */
  public get basicDemoSourceCode(): string {
    return `
      <ngx-multi-selector [items]="customers"
                          [(ngModel)]="chosenCustomers"
                          [display-property]="'firstName'"
                          [key]="'id'">
      </ngx-multi-selector>
    `
  }

  //#endregion

  //#region Constructors

  /*
  * Initialize component.
  * */
  public constructor(@Inject('ICustomerService') protected customerService: ICustomerService) {

  }

  //#endregion

  //#region Methods

  /*
  * Called when component is initialized.
  * */
  public ngOnInit(): void {

    // Load the customers list.
    this.customerService
      .loadCustomersAsync()
      .subscribe(customers => {

        // Bind the customers.
        this.customers = customers;

        // Mark the customers list to be loaded.
        this.hasCustomersListLoaded = true;
      })
  }

  //#endregion

}
