import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  private controller: string = "Common";
  private ApiUrl: string = "https://localhost:7250/api/"

  public Dynamicdelete(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.controller + "/Delete_By_Table_And_Where", data)
  }
  public DynamicDeleteImages(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.controller + "/Delete_By_Table_And_where_and_file_name", data)
  }

}
