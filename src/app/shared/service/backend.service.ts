import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl = environment.apiUrl + 'join/';

  constructor(private http: HttpClient) {}

  getRequest<T>(category: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl + category}/`, {
      withCredentials: true,
    });
  }

  postRequest<T>(category: string, jsonData: object): Observable<T> {
    return this.http.post<T>(`${this.baseUrl + category}/`, jsonData, {
      withCredentials: true,
    });
  }

  patchRequest<T>(category: string, jsonData: object): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl + category}/`, jsonData, {
      withCredentials: true,
    });
  }

  deleteRequest<T>(category: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl + category}/`, {
      withCredentials: true,
    });
  }
}
