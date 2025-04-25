import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-mobile.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService,) {}

  dropDownMenu: boolean = false;
  isMobile: boolean = window.innerWidth < 800;

  /**
   * Log out , return to Login side an delete all sessionStorage strings
   */
  logOut() {

    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 800;
  }
}
