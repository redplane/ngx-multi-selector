import {Response} from "@angular/http";

export interface ICategoryService{

  // Get categories from database.
  getCategories(keyword: string): Promise<Response>;
}
