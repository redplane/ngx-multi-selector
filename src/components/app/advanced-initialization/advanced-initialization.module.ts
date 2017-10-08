import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgxMultiSelectorModule} from "../../../modules/ngx-multi-selector/ngx-multi-selector.module";
import {AdvancedInitializationComponent} from "./advanced-initialization.component";
import {CustomerServiceMock} from "../../../services/mocks/customer-service.mock";
import {DataSourceComponent} from "./data-source/data-source.component";
import {ToggleOptionComponent} from "./toggle-option/toggle-option.component";
import {BiDirectionBindingComponent} from "./bi-direction-binding/bi-direction-binding.component";
import {RemoveBoundItemComponent} from "./bi-direction-binding/remove-bound-item/remove-bound-item.component";
import {RandomItemSelectionComponent} from "./bi-direction-binding/random-item-selection/random-item-selection.component";
import {InheritSelectionComponent} from "./bi-direction-binding/inherit-selection/inherit-selection.component";
import {EventHandlingComponent} from "./event-handling/event-handling.component";
import {AdvancedInitializationRoutingModule} from "./advanced-initialization.routing";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    DataSourceComponent,
    ToggleOptionComponent,
    BiDirectionBindingComponent,
    RemoveBoundItemComponent,
    RandomItemSelectionComponent,
    InheritSelectionComponent,
    EventHandlingComponent,
    AdvancedInitializationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,

    AdvancedInitializationRoutingModule,
    SharedModule,
    NgxMultiSelectorModule
  ],
  providers: [
    {
      provide: 'ICustomerService',
      useClass: CustomerServiceMock
    }
  ]
})

export class AdvancedInitializationModule {
}
