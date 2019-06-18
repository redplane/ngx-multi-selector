import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ToggleOptionComponent} from './toggle-option.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxMultiSelectorModule} from '../../../../../ngx-multi-selector/src/lib/ngx-multi-selector.module';

const routes: Routes = [
  {
    path: '',
    component: ToggleOptionComponent
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
    NgxMultiSelectorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ToggleOptionComponent
  ]
})
export class ToggleOptionRouteModule {

}
