import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CustomerServiceMock} from "../services/mocks/customer-service.mock";
import {ApiServiceMock} from "../services/mocks/api-service.mock";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./shared/layout/layout.component";

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
        redirectTo: '/basic-demo'
      },
      {
        path: 'basic-demo',
        loadChildren: './basic-demo/basic-demo.module#BasicDemoModule',
      },
      {
        path: 'advanced-demo',
        loadChildren: './advanced-demo/advanced-demo.module#AdvancedDemoModule'
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
    RouterModule.forRoot(routes, {enableTracing: false})
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

export class AppRouteModule {
}
