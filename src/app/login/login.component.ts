import { Component, HostListener } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    './login-form.component.scss',
    './login-mobile.component.scss',
  ],
})
export class LoginComponent {
  signup: boolean = false;
  isMobile: boolean = window.innerWidth < 1024;

  loginData = {
    login_mail: '',
    login_pw: '',
  };

  signupData = {
    signup_name: '',
    signup_mail: '',
    signup_pw: '',
    signup_pw_confirm: '',
    terms: false,
  };

  constructor(private authService: AuthService) {}

  /**
   * Clear the Form field when switch between sign up / and login
   * And swtich the "aktive" state Login/Sign up
   */
  toogleToSignIn() {
    this.signup = this.signup ? false : true;

    this.loginData = {
      login_mail: '',
      login_pw: '',
    };

    this.signupData = {
      signup_name: '',
      signup_mail: '',
      signup_pw: '',
      signup_pw_confirm: '',
      terms: false,
    };
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 1024;
  }

  showPassword: boolean = false;
  showRepeadetPassword: boolean = false;

  /**
   *Toogle the passwort atribute from passwort to text

   * @param string
   */
  toggleShowPassword(string: string): void {
    if (string == 'repeat') {
      this.showRepeadetPassword = !this.showRepeadetPassword;
    } else if (string == 'pw') {
      this.showPassword = !this.showPassword;
    }
  }

  onSubmitLogIn(ngForm: NgForm) {
    if (ngForm.form.valid && ngForm.submitted) {
      this.authService.login(this.loginData).subscribe({
        next: (response) => {
          console.log('Login successfully.', response);
          this.saveSessionStorage(response);
        },
        error: (error) => {
          if (error.error.email) {
            console.log(`${error.error.email[0]}`);
          } else {
            console.log(`${error.error.error[0]}`);
          }
        },
      });
    }
  }

  /**
   * Check if Form is Valid and send call POST funktion from service
   * to Backend with filled Data
   *
   * @param ngForm
   */
  onSubmitSignUp(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.authService.register(this.signupData).subscribe({
        next: (response) => {
          console.log('You Signed Up successfully.', response);
          this.saveSessionStorage(response);
        },
        error: (error) => {
          if (error.error.email) {
            console.log(`${error.error.email[0]}`);
          } else {
            console.log(`${error}`, error);
          }
        },
      });
    }
  }

  /**
   * Save the User Name / Mail and the token in sessionStorage
   *
   * @param response get the Data from user as Json
   */
  saveSessionStorage(response: any) {
    sessionStorage.setItem('authToken', response.token);
    sessionStorage.setItem('usermail', response.email);
    sessionStorage.setItem('username', response.username.replaceAll('-', ' '));
  }
}
