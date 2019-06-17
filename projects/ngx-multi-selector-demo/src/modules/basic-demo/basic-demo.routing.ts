import {BasicDemoComponent} from "./basic-demo.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

// Route configuration.
const routes: Routes = [
  {
    path: '',
    component: BasicDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicInitializationRoutingModule {
}
