import {BasicInitializationComponent} from "./basic-initialization.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

// Route configuration.
const routes: Routes = [
  {
    path: '',
    component: BasicInitializationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicInitializationRoutingModule {
}
