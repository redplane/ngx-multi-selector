import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Ng2MultiSelectorComponent} from "./ng2-multi-selector.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [Ng2MultiSelectorComponent],
  exports: [Ng2MultiSelectorComponent]
})
export class Ng2MultiSelectorModule {
}
