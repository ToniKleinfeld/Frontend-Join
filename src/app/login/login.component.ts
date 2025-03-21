import { Component, HostListener } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login-form.component.scss'],
})
export class LoginComponent {
  signup: boolean = false;
  isMobile: boolean = window.innerWidth < 1024;

  signIn() {
    this.signup = this.signup ? false : true;

    //hier noch clearen der Inputfelder!  evtl showPassword / showRepeadetPassword auf false wieder setzten!
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 1024;
  }

  //Input strings
  input_password: string = '';
  setpassword: string = '';
  confirmPassword: string = '';

  showPassword: boolean = false;
  showRepeadetPassword:boolean = false;

  toggleShowPassword(string:string): void {
    if (string == 'repeat') {
      this.showRepeadetPassword = !this.showRepeadetPassword;
    } else if(string == 'pw') {
      this.showPassword = !this.showPassword;
    }
  }

  passwordsMatch: boolean = true;

  // Methode zum Umschalten der Passwort-Sichtbarkeit



  // Methode, die beim Keyup im Passwortfeld aufgerufen wird
  onKeyup(): void {
    this.checkPasswordMatch();
  }

  // Beispiel einer Passwort-Abgleichsfunktion:
  checkPasswordMatch(): void {
    // Hier nehmen wir an, dass "password" bereits definiert ist.
    // Wenn du nur ein Feld hast, entferne diesen Abgleich oder passe ihn an.
    // Für Demo-Zwecke setzen wir passwordsMatch auf true, wenn confirmPassword leer ist,
    // oder auf false, wenn es einen bestimmten Zustand erfüllt.
    if (!this.confirmPassword) {
      this.passwordsMatch = true;
    } else {
      // Beispiel: Hier könntest du z.B. einen Vergleich mit einer anderen Variable durchführen:
      // this.passwordsMatch = (this.password === this.confirmPassword);
      // Aktuell simulieren wir einen Fehler, falls das Passwort weniger als 6 Zeichen hat:
      this.passwordsMatch = this.confirmPassword.length >= 6;
    }
  }
}
