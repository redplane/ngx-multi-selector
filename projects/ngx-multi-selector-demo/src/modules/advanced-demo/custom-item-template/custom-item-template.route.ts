import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerItemTemplateComponent} from './custom-item-template.component';

//#region Routes

const routes: Routes = [
  {
    path: '',
    component: CustomerItemTemplateComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

//#endregion

//#region Module declaration

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    CustomerItemTemplateComponent
  ],
  exports: [
    RouterModule
  ]
})
export class CustomItemTemplateRouteModule {

}

//#endregion
