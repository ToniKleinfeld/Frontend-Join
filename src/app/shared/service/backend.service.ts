import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl = environment.apiUrl + 'join/';

  constructor(private http: HttpClient) {}

  getRequest(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl + category}/`, {
      withCredentials: true,
    });
  }

  postRequest(category: string, jsonData: object): Observable<any> {
    return this.http.post(`${this.baseUrl + category}/`, jsonData, {
      withCredentials: true,
    });
  }

  patchRequest(
    category: string,
    id: string,
    jsonData: object
  ): Observable<any> {
    return this.http.patch(`${this.baseUrl + category}/`, jsonData, {
      withCredentials: true,
    });
  }

  deleteRequest(category: string): Observable<any> {
    return this.http.delete(`${this.baseUrl + category}/`, {
      withCredentials: true,
    });
  }
}
