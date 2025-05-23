import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { BackendService } from '../../service/backend.service';
import { User } from '../../interfaces/interfaces.model';
import { Observable } from 'rxjs';
import { InitialsPipe } from '../../pipes/initials.pipe';

@Component({
  selector: 'app-header',
  imports: [CommonModule, InitialsPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-mobile.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$!: Observable<User>;

  currentPath: string;
  isPrivate: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private backendService: BackendService
  ) {
    this.currentPath = this.router.url;
    this.isPrivate = !this.isPrivateRoute();
  }

  dropDownMenu: boolean = false;
  isMobile: boolean = window.innerWidth < 800;

  /**
   * Check if current coute = puplic ( no login )
   * @returns boolean
   */
  isPrivateRoute(): boolean {
    return this.currentPath.includes('/puplic');
  }

  /**
   * Log out , return to Login side an delete all sessionStorage strings
   */
  logOut() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 800;
  }

  /**
   *  On Init Api call get current username
   */
  ngOnInit(): void {
    if (this.isPrivate) {
      this.user$ = this.backendService.getRequest<User>('users/me');
    }
  }
}
