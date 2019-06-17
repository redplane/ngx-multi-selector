import {NgModule} from "@angular/core";
import {LayoutComponent} from "./layout/layout.component";
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    LayoutComponent,
    NavigationBarComponent,
    SideBarComponent
  ],
  imports: [
    FormsModule,
    RouterModule
  ]
})

export class SharedModule {
}
