import {Component, Inject, OnInit} from "@angular/core";
import {ICustomerService} from "../../../../../interfaces/customer-service.interface";
import {Response} from '@angular/http';

@Component({
  selector: 'random-item-selection',
  templateUrl: 'random-item-selection.component.html'
})

export class RandomItemSelectionComponent implements OnInit{

  //#region Properties

  /*
  * Original list of customers to be selected.
  * */
  private customers: Array<any>;

  /*
  * List of chosen customers.
  * */
  private chosenCustomers: Array<any>;

  /*
  * List of filtered customers.
  * This list should be displayed on multi selector.
  * */
  private filteredCustomers: Array<any>;

  //#endregion

  //#region Constructor

  /*
  * Initiate component with injectors.
  * */
  public constructor(@Inject('ICustomerService') public customerService: ICustomerService){

  }

  //#endregion

  //#region Methods

  /*
  * Callback which is fired when component has been initiated successfully.
  * */
  public ngOnInit(): void {
    this.customerService.getCustomers().then((x: Response) =>{
      this.customers = x.json();
    });
  }

  /*
  * Generate a list of chosen items.
  * */
  public generateChosenItems(): void{
    let iCustomersListLength = this.customers.length - 1;
    let iRandom = Math.floor((Math.random() * iCustomersListLength) + 1);

    // Clear the second chosen list.
    this.chosenCustomers = new Array<any>();
    this.chosenCustomers.push(this.customers[iRandom]);
  }

  //#endregion

}
