import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api/auth/';

  constructor(private http: HttpClient) {}

  /**
   * POST request to auth server for login
   *
   * @param signupData from Login component
   * @returns POST request to server
   */
  login(loginData: { login_mail: string; login_pw: string }): Observable<any> {
    const formattedData = {
      email: loginData.login_mail.toLowerCase(),
      password: loginData.login_pw,
    };
    return this.http.post(`${this.baseUrl}login/`, formattedData);
  }

  /**
   * POST request for create a new account
   *
   * @param signupData from Login component
   * @returns POST request to server
   */
  register(signupData: {
    signup_name: string;
    signup_mail: string;
    signup_pw: string;
    signup_pw_confirm: string;
    terms: boolean;
  }): Observable<any> {
    const formattedData = {
      username: signupData.signup_name.toLowerCase().replaceAll(' ', '-'),
      email: signupData.signup_mail.toLowerCase(),
      password: signupData.signup_pw,
      repeated_password: signupData.signup_pw_confirm,
    };
    return this.http.post(`${this.baseUrl}registration/`, formattedData);
  }
}
