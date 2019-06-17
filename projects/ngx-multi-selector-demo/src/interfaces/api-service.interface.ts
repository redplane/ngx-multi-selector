import {Response} from "@angular/http";

export interface IApiService{

  // Get list of apis.
  getApis(): Promise<Response>;
}
