import {NgxMultiSelectorComponent} from './ngx-multi-selector.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgxMultiSelectorComponent],
  exports: [NgxMultiSelectorComponent]
})

export class NgxMultiSelectorModule {
}
