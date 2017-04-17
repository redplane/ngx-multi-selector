import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {Ng2MultiSelectorModule} from "../../modules/ng2-multi-selector/ng2-multi-selector.module";
import {CustomerServiceMock} from "../../services/mocks/customer-service.mock";
import {ApiServiceMock} from "../../services/mocks/api-service.mock";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    Ng2MultiSelectorModule
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
