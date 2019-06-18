import {NgModule} from '@angular/core';
import {DataSourceComponent} from './data-source.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: DataSourceComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DataSourceComponent
  ],
  exports: [
    RouterModule
  ]
})
export class DataSourceRouteModule {

}
