import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GridFieldConfig } from './grid-config-form.component';

@Injectable({
  providedIn: 'root'
})
export class GridConfigFormService {

  constructor(private http: HttpClient) { }

  getConfig(entity: string): Observable<GridFieldConfig[]> {
    return this.http.get<GridFieldConfig[]>(`/api/GridConfig/${entity}`);
  }

  saveConfig(config: GridFieldConfig[]): Observable<any> {
    return this.http.post(`/api/GridConfig/save`, config);
  }
}
