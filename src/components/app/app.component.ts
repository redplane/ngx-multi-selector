import {Component, Inject, OnInit} from '@angular/core';
import {ICategoryService} from "../../interfaces/customer-service.interface";
import {Response} from "@angular/http";
import {Category} from "../../models/category";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  // List of items which should be shown up in the multi selector.
  private categories: Array<Category>;


  public constructor(@Inject("ICategoryService") public categoryService: ICategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories(null)
      .then((x: Response) => {
        this.categories = x.json();
      })
  }

  public searchItem(keyword: string): void {
    this.categoryService.getCategories(keyword)
      .then((x: Response) => {
        this.categories = x.json();
      })
  }
}
