import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CustomerServiceMock} from "../../services/mocks/customer-service.mock";
import {ApiServiceMock} from "../../services/mocks/api-service.mock";
import {NgxMultiSelectorModule} from 'modules/ngx-multi-selector/ngx-multi-selector.module';
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./shared/layout/layout.component";
import {SharedModule} from "./shared/shared.module";
import {BasicInitializationModule} from "./basic-initialization/basic-initialization.module";
import {AdvancedInitializationModule} from "./advanced-initialization/advanced-initialization.module";

//#region Properties

// Application routes configuration.
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/basic-initialization'
      },
      {
        path: 'basic-initialization',
        loadChildren: 'components/app/basic-initialization/basic-initialization.module#BasicInitializationModule',
      },
      {
        path: 'advanced-initialization',
        loadChildren: 'components/app/advanced-initialization/advanced-initialization.module#AdvancedInitializationModule'
      }
    ]
  }
];

//#endregion

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports:[
    RouterModule
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

export class AppRoutingModule {
}
