import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  isMobile: boolean = window.innerWidth < 1200;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 1200;
  }
}
