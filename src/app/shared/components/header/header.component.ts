import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  dropDownMenu: boolean = false;

  /**
   * Log out , return to Login side an delete all sessionStorage strings
   */
  logOut() {
    sessionStorage.removeItem('usermail');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
