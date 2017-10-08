import {Component, Inject, OnInit} from "@angular/core";
import {ICustomerService} from "../../../../interfaces/customer-service.interface";
import {Response} from '@angular/http';

@Component({
  selector: 'advanced-initialization-toggle-option',
  templateUrl: 'toggle-option.component.html'
})

export class ToggleOptionComponent implements OnInit{

  //#region Properties

  // ngx-multi-selector options.
  private options: any;

  // List of customers.
  private customers: Array<any>;

  // List of chosen items.
  private chosenCustomers: Array<any>;

  //#endregion

  //#region Constructor

  /*
  * Initiate component successfully.
  * */
  public constructor(@Inject('ICustomerService') public customerService: ICustomerService){
    this.options = {
      bClearButtonAvailable: false,
      bSearchBoxAvailable: false,
      limitItemAmount: 5,
      placeholderSearchDropDown: '',
      placeholderTitleDropDown: '',
      separationCharacter: ' - ',
      bDisabled: false
    };

    this.chosenCustomers = [];
  }

  //#endregion

  //#region Methods

  /*
  * Callback which is called when component has been initiated successfully.
  * */
  public ngOnInit(): void {
    // Load customers.
    this.customerService.getCustomers().then((x: Response) =>{
      this.customers = x.json();
    });
  }

  //#endregion

}
