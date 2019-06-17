import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {CustomerServiceMock} from '../services/mocks/customer-service.mock';
import {ApiServiceMock} from '../services/mocks/api-service.mock';
import {SharedModule} from './shared/shared.module';
import {AppRouteModule} from './app.route';
import {HttpClientModule} from '@angular/common/http';
import {NgxMultiSelectorModule} from '../../../ngx-multi-selector/src/lib/ngx-multi-selector.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    SharedModule,
    AppRouteModule,

    NgxMultiSelectorModule
  ],
  providers: [
    {
      provide: 'ICustomerService',
      useClass: CustomerServiceMock
    },
    {
      provide: 'IApiService',
      useClass: ApiServiceMock
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
