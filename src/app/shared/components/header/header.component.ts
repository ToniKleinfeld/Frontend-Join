import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-mobile.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  dropDownMenu: boolean = false;
  isMobile: boolean = window.innerWidth < 800;

  /**
   * Log out , return to Login side an delete all sessionStorage strings
   */
  logOut() {
    sessionStorage.removeItem('usermail');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 800;
  }
}
