import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AdvancedDemoComponent} from "./advanced-demo.component";
import {CustomerServiceMock} from "../../services/mocks/customer-service.mock";
import {DataSourceComponent} from "./data-source/data-source.component";
import {ToggleOptionComponent} from "./toggle-option/toggle-option.component";
import {BiDirectionBindingComponent} from "./bi-direction-binding/bi-direction-binding.component";
import {RemoveBoundItemComponent} from "./bi-direction-binding/remove-bound-item/remove-bound-item.component";
import {RandomItemSelectionComponent} from "./bi-direction-binding/random-item-selection/random-item-selection.component";
import {InheritSelectionComponent} from "./bi-direction-binding/inherit-selection/inherit-selection.component";
import {EventHandlingComponent} from "./event-handling/event-handling.component";
import {AdvancedInitializationRoutingModule} from "./advanced-demo.route";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import {NgxMultiSelectorModule} from '../../../../ngx-multi-selector/src/lib/ngx-multi-selector.module';

@NgModule({
  declarations: [
    DataSourceComponent,
    ToggleOptionComponent,
    BiDirectionBindingComponent,
    RemoveBoundItemComponent,
    RandomItemSelectionComponent,
    InheritSelectionComponent,
    EventHandlingComponent,
    AdvancedDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

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

export class AdvancedDemoModule {
}
