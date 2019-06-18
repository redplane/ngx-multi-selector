import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdvancedDemoComponent} from "./advanced-demo.component";
import {BiDirectionBindingComponent} from "./bi-direction-binding/bi-direction-binding.component";
import {RemoveBoundItemComponent} from "./bi-direction-binding/remove-bound-item/remove-bound-item.component";
import {InheritSelectionComponent} from "./bi-direction-binding/inherit-selection/inherit-selection.component";
import {RandomItemSelectionComponent} from "./bi-direction-binding/random-item-selection/random-item-selection.component";

// Route configuration.
const routes: Routes = [
  {
    path: '',
    component: AdvancedDemoComponent,
    children:[
      {
        path: 'data-source',
        loadChildren: './data-source/data-source.module#DataSourceModule'
      },
      {
        path: 'toggle-option',
        loadChildren: './toggle-option/toggle-option.module#ToggleOptionModule'
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
            path: '**',
            redirectTo: 'remove-bound-items'
          }
        ]
      },
      {
        path: 'event-handling',
        loadChildren: './event-handling/event-handling.module#EventHandlingModule'
      },
      {
        path: 'custom-item-template',
        loadChildren: './custom-item-template/custom-item-template.module#CustomItemTemplateModule'
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
