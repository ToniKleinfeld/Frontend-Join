import { Component } from '@angular/core';
import { ButtonComponent } from "../shared/components/button/button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','./login-form.component.scss']
})
export class LoginComponent {
  signup:boolean = false;

  signIn(){
    this.signup = this.signup ? false : true
  }
}
