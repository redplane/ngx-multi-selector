import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdvancedInitializationComponent} from "./advanced-initialization.component";
import {DataSourceComponent} from "./data-source/data-source.component";
import {ToggleOptionComponent} from "./toggle-option/toggle-option.component";
import {BiDirectionBindingComponent} from "./bi-direction-binding/bi-direction-binding.component";
import {RemoveBoundItemComponent} from "./bi-direction-binding/remove-bound-item/remove-bound-item.component";
import {InheritSelectionComponent} from "./bi-direction-binding/inherit-selection/inherit-selection.component";
import {RandomItemSelectionComponent} from "./bi-direction-binding/random-item-selection/random-item-selection.component";
import {EventHandlingComponent} from "./event-handling/event-handling.component";

// Route configuration.
const routes: Routes = [
  {
    path: '',
    component: AdvancedInitializationComponent,
    children:[
      {
        path: 'data-source',
        component: DataSourceComponent
      },
      {
        path: 'toggle-option',
        component: ToggleOptionComponent
      },
      {
        path: 'bi-directional-binding',
        component: BiDirectionBindingComponent,
        children:[
          {
            path: 'remove-bound-items',
            component: RemoveBoundItemComponent
          },
          {
            path: 'random-items-selection',
            component: RandomItemSelectionComponent
          },
          {
            path: 'inherit-items-selection',
            component: InheritSelectionComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/advanced-initialization/bi-directional-binding/remove-bound-items'
          }
        ]
      },
      {
        path: 'event-handling',
        component: EventHandlingComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'data-source'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedInitializationRoutingModule { }
