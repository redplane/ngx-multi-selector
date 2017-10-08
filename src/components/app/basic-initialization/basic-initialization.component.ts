import {Component} from "@angular/core";

@Component({
  selector: 'basic-initialization',
  templateUrl: 'basic-initialization.component.html'
})

export class BasicInitializationComponent {

  //#region Properties

  // List of customers.
  private customers: Array<any>;

  // List of chosen customer.
  private chosenCustomers: Array<any>;

  //#endregion

  //#region Constructors

  /*
  * Initialize component.
  * */
  public constructor() {

    // Initialize customers list.
    this.customers = [
      {
        "id": 1,
        "firstName": "Howey",
        "lastName": "Connock"
      }, {
        "id": 2,
        "firstName": "Sibylle",
        "lastName": "Zettler"
      }, {
        "id": 3,
        "firstName": "Kyrstin",
        "lastName": "Posen"
      }, {
        "id": 4,
        "firstName": "Amelie",
        "lastName": "Southam"
      }, {
        "id": 5,
        "firstName": "Karleen",
        "lastName": "Bedburrow"
      }, {
        "id": 6,
        "firstName": "Natty",
        "lastName": "Sigfrid"
      }, {
        "id": 7,
        "firstName": "Kenny",
        "lastName": "d' Eye"
      }, {
        "id": 8,
        "firstName": "Horatia",
        "lastName": "Lorent"
      }, {
        "id": 9,
        "firstName": "Melesa",
        "lastName": "Inglesent"
      }, {
        "id": 10,
        "firstName": "Gerhardine",
        "lastName": "Wigfall"
      }];

    // Initialize list of chosen customers.
    this.chosenCustomers = [];

  }

  //#endregion

}
