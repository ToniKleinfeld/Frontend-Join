import { Component, HostListener } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';

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
  private guesttoken :string = '9b0b222592cec1c4553b9f9fec588a588350fcf8';
  signup: boolean = false;
  isMobile: boolean = window.innerWidth < 1024;
  feedback_Login_SingUp: string = '';

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

  constructor(private authService: AuthService, private router: Router) {}

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

  /**
   * Call the servicelogin with the form data login , to get reponse
   *
   * @param ngForm
   */
  onSubmitLogIn(ngForm: NgForm) {
    if (ngForm.form.valid && ngForm.submitted) {
      this.authService.login(this.loginData).subscribe({
        next: (response) => {
          let logedIn = 'Login successfully.';
          this.showFeedbackMsg(logedIn);
          this.saveSessionStorage(response);
          this.routeToSummary();
        },
        error: (error) => {
          if (error.error.email) {
            this.showFeedbackMsg(error.error.email[0]);
          } else {
            this.showFeedbackMsg(error.error.error[0]);
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
          let signUp = 'You Signed Up successfully.';
          this.showFeedbackMsg(signUp);
          this.saveSessionStorage(response);
          this.routeToSummary();
        },
        error: (error) => {
          if (error.error.email) {
            this.showFeedbackMsg(error.error.email[0]);
          } else {
            console.error(`${error}`, error);
          }
        },
      });
    }
  }

  /**
   * Show massage in Feedbackbox ,
   * when get Respond or error from backend request and clear
   * and clear it after 2second to hide container again
   *
   * @param msg
   */
  showFeedbackMsg(msg: any) {
    this.feedback_Login_SingUp = `${
      msg.charAt(0).toUpperCase() + msg.slice(1)
    }`;
    setTimeout(() => {
      this.feedback_Login_SingUp = ``;
    }, 900);
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

  /**
   * Navigate to Summary after a timeout , when login/signup succesful
   */
  routeToSummary() {
    setTimeout(() => {
      this.router.navigate(['/summary']);
    }, 1000);
  }

  /**
   * Guest login , with createt user in Backend "guest" , per token
   */
  guestLogIn(){
    this.showFeedbackMsg('Login successfully.');
    sessionStorage.setItem('authToken', this.guesttoken);
    sessionStorage.setItem('usermail', 'guest@testmyjoin.me');
    sessionStorage.setItem('username', 'guest');
    this.routeToSummary();
  }
}
