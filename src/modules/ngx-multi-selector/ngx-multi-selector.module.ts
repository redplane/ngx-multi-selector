import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxMultiSelectorComponent} from "./ngx-multi-selector.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgxMultiSelectorComponent],
  exports: [NgxMultiSelectorComponent]
})
export class NgxMultiSelectorModule {
}
