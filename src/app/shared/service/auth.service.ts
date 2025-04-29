import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl + 'auth/';

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
    return this.http.post(`${this.baseUrl}login/`, formattedData, {
      withCredentials: true,
    });
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
    return this.http.post(`${this.baseUrl}registration/`, formattedData, {
      withCredentials: true,
    });
  }

  /**
   * Post request to check if token still valid
   *
   * @returns POST Request zu server
   */
  verifyToken(): Observable<boolean> {
    return this.http
      .post<{ detail: string }>(
        `${this.baseUrl}verify/`,
        {},
        { withCredentials: true }
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  /**
   * check if there is already a http only Cookie
   *
   * @returns true , when Cookie exist
   */
  pingCookie(): Observable<boolean> {
    return this.http
      .post<void>(
        `${this.baseUrl}ping-cookie/`,
        {},
        { withCredentials: true, observe: 'response' }
      )
      .pipe(map((resp) => resp.status === 200));
  }

  /**
   * send the cookies to server to delete token
   *
   * @returns return withCredentials to server
   */
  logout() {
    return this.http.post(
      `${this.baseUrl}logout/`,
      {},
      { withCredentials: true }
    );
  }
}
