import {ICategoryService} from "../../interfaces/customer-service.interface";
import {Http, Response, ResponseOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import {Category} from "../../models/category";

@Injectable()
export class CategoryServiceMock implements ICategoryService {

  public constructor(private http: Http) {
  }

  // Get all customers from database.
  public getCategories(keyword: string): Promise<Response> {

    let categories = new Array<Category>();
    for (let index = 0; index < 10; index++) {
      let category = new Category();
      category.CategoryID = `Category ${index}`;
      category.CategoryName = `Category Name ${index}`;
      category.Description = `Description ${index}`;
      categories.push(category);
    }

    let options = new ResponseOptions();
    options.status = 200;
    options.body = categories;

    if (keyword != null && keyword.length > 0)
      options.body = categories.filter((x: Category) => {
        return x.CategoryName.indexOf(keyword) != -1;
      });

    let response = new Response(options);
    return Promise.resolve(response)
    // return this.http.get("https://api.myjson.com/bins/h9wlr")
    //   .toPromise();
  }
}
