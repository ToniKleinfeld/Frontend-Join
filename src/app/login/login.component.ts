import { Component, HostListener } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login-form.component.scss','./login-mobile.component.scss'],
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

  constructor(private authService: AuthService) { }

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
          console.log('Login erfolgreich', response);
          sessionStorage.setItem('authToken', response.token);
        },
        error: (error) => {
          console.error('Fehler beim Login', error);
        }
      });
    }
  }

  onSubmitSignUp(ngForm:NgForm){
    if (ngForm.submitted && ngForm.form.valid) {
      console.log('test submit signup')
    }
  }

}
