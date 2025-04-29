import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { BackendService } from '../../service/backend.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-mobile.component.scss'],
})
export class HeaderComponent implements OnInit,OnDestroy{
  constructor(private router: Router, private authService: AuthService,private backendService: BackendService) {}

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

  ngOnInit(): void {
    this.backendService.getRequest('users/11').subscribe({
      next: (resonse) => {
        console.log(resonse)
      }
    })
  }
  // TODO: Wie frage ich den derzeitigen User am besten ab ohne localStorage? --> eigene Backend view?

  ngOnDestroy(): void {

  }
}
