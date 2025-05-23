import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss', './sidenav-mobile.component.scss'],
})
export class SidenavComponent {
  currentPath: string;
  isPrivate: boolean = false;

  constructor(private router: Router) {
    this.currentPath = this.router.url;
    this.isPrivate = !this.isPrivateRoute();
  }

  isMobile: boolean = window.innerWidth <= 1200;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth <= 1200;
  }

  /**
   * Check if current coute = puplic ( no login )
   * @returns boolean
   */
  isPrivateRoute(): boolean {
    return this.currentPath.includes('/puplic');
  }
}
