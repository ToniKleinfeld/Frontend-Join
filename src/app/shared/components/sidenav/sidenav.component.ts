import { Component,HostListener } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss','./sidenav-mobile.component.scss',]
})
export class SidenavComponent {

  isMobile: boolean = window.innerWidth <= 1200;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth <= 1200;
  }
}
