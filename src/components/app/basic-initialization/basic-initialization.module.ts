import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgxMultiSelectorModule} from "../../../lib/ngx-multi-selector/ngx-multi-selector.module";
import {CustomerServiceMock} from "../../../services/mocks/customer-service.mock";
import {BasicInitializationComponent} from "./basic-initialization.component";
import {BasicInitializationRoutingModule} from "./basic-initialization.routing";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    BasicInitializationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,

    BasicInitializationRoutingModule,
    SharedModule,
    NgxMultiSelectorModule
  ],
  providers: [
    {
      provide: 'ICustomerService',
      useClass: CustomerServiceMock
    }
  ]
})

export class BasicInitializationModule {
}
