import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { BackendService } from '../../service/backend.service';
import { User } from '../../interfaces/interfaces.model';
import { Observable } from 'rxjs';
import { InitialsPipe } from '../../pipes/initials.pipe';

@Component({
  selector: 'app-header',
  imports: [CommonModule, InitialsPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-mobile.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$!: Observable<User>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private backendService: BackendService
  ) {}

  dropDownMenu: boolean = false;
  isMobile: boolean = window.innerWidth < 800;

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
    this.user$ = this.backendService.getRequest<User>('users/me');
  }
}
