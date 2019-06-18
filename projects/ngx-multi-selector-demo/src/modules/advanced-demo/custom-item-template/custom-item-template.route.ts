import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerItemTemplateComponent} from './custom-item-template.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxMultiSelectorModule} from '../../../../../ngx-multi-selector/src/lib/ngx-multi-selector.module';

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
    FormsModule,
    CommonModule,
    NgxMultiSelectorModule,
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
