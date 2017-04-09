import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {Ng2MultiSelectorModule} from "../../modules/ng2-multi-selector/ng2-multi-selector.module";
import {ICategoryService} from "../../interfaces/customer-service.interface";
import {CategoryServiceMock} from "../../services/mocks/category-service.mock";

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
      provide: "ICategoryService",
      useClass: CategoryServiceMock
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
