import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CustomerServiceMock} from "../../services/mocks/customer-service.mock";
import {ApiServiceMock} from "../../services/mocks/api-service.mock";
import {NgxMultiSelectorModule} from '../../lib/public_api';
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app.routing";

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    SharedModule,
    AppRoutingModule,

    NgxMultiSelectorModule
  ],
  providers: [
    {
      provide: "ICustomerService",
      useClass: CustomerServiceMock
    },
    {
      provide: "IApiService",
      useClass: ApiServiceMock
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
