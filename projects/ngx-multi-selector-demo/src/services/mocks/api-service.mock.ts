import {IApiService} from "../../interfaces/api-service.interface";
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiServiceMock implements IApiService{

  public constructor(public http: Http){

  }

  getApis(): Promise<Response> {
    return this.http.get("https://api.myjson.com/bins/srnqr")
      .toPromise();
  }


}
