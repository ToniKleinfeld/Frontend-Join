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

  GetRequest(category:string): Observable<any> {
    return this.http.get(`${this.baseUrl + category}/`, {
      withCredentials: true,
    });
  }
}
