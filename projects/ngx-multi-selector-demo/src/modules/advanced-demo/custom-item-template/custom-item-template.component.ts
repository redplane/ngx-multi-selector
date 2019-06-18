import {Component, Inject, OnInit} from '@angular/core';
import {Customer} from '../../../models/customer';
import {ICustomerService} from '../../../interfaces/customer-service.interface';

@Component({
  selector: 'custom-item-template-demo',
  templateUrl: 'custom-item-template.component.html',
  styleUrls: ['custom-item-template.component.scss']
})
export class CustomerItemTemplateComponent implements OnInit {

  //#region Properties

  private _customer: Customer[];

  public selectedCustomers: Customer[];

  public hasCustomersListLoaded: boolean;

  public htmlSourceCode = `
    <fieldset>
    <legend>Item template</legend>
    <div class="col-lg-6">
      <label>Multi selector</label>
      <ngx-multi-selector #customerSelector="ngx-multi-selector"
                          [items]="customers"
                          [is-search-box-available]="true"
                          [(ngModel)]="selectedCustomers"
                          [display-property]="'firstName'"
                          [key]="'id'"
                          [separation-character]="' - '"
                          [item-template]="itemTemplate"
                          [placeholder-title-drop-down]="placeholderTitle">
      </ngx-multi-selector>
    </div>
  
    <div class="col-lg-6">
      <table class="table table-responsive table-bordered table-condensed">
        <thead>
        <tr>
          <th class="text-center">Id</th>
          <th class="text-center">First name</th>
          <th class="text-center">Last name</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let customer of selectedCustomers">
          <td class="text-center">{{customer.id}}</td>
          <td class="text-center">{{customer.firstName}}</td>
          <td class="text-center">{{customer.lastName}}</td>
          <td>
            <button class="btn btn-flat btn-danger"
                    (click)="customerSelector.deleteSelectedValue(customer)">
              <span class="glyphicon glyphicon-trash"></span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </fieldset>
  
  <ng-template #itemTemplate
               let-customer="item"
               let-instance="instance"
               let-selected="selected">
    <li (click)="instance.clickSelectItem(customer)"
        [class.active]="selected">
      <a href="javascript:void(0);">
        <img class="img-thumbnail" [src]="'https://i.imgur.com/wgT1ypP.png'">
        <span>&nbsp;</span>
        <span>{{customer.firstName}} {{customer.lastName}}</span>
      </a>
    </li>
  </ng-template>
  `;

  //#endregion

  //#region Accessors

  public get customers(): Customer[] {
    return this._customer;
  }

  public get placeholderTitle(): string {
    if (!this.hasCustomersListLoaded) {
      return 'Customers are being loaded...';
    }

    return 'Please select at least one customer';
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject('ICustomerService') protected customerService: ICustomerService) {

  }


  //#endregion

  //#region Methods

  /*
  * Called when component is initialized.
  * */
  public ngOnInit(): void {
    this.customerService
      .loadCustomersAsync()
      .subscribe(customers => {
        this._customer = customers;
        this.hasCustomersListLoaded = true;
      })
  }

  //#endregion
}
