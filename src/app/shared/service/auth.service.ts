import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000/api/auth/';

  constructor(private http: HttpClient) { }

  login(loginData: { login_mail: string; login_pw: string; }): Observable<any> {
    return this.http.post(`${this.baseUrl}login/`, loginData);
  }

  register(signupData: { signup_name: string; signup_mail: string; signup_pw: string; signup_pw_confirm: string; terms: boolean; }): Observable<any> {
    return this.http.post(`${this.baseUrl}registration/`, signupData);
  }
}
