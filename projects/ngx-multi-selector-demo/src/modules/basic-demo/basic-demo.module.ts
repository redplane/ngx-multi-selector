import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CustomerServiceMock} from "../../services/mocks/customer-service.mock";
import {BasicDemoComponent} from "./basic-demo.component";
import {BasicInitializationRoutingModule} from "./basic-demo.routing";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import {NgxMultiSelectorModule} from '../../../../ngx-multi-selector/src/lib/ngx-multi-selector.module';
import {ToTrustedHtmlPipe} from '../../pipes/to-trusted-html.pipe';

@NgModule({
  declarations: [
    BasicDemoComponent,
    ToTrustedHtmlPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

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

export class BasicDemoModule {
}
