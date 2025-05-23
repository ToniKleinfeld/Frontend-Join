import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';

@Component({
  selector: 'app-puplic',
  imports: [HeaderComponent, SidenavComponent, RouterOutlet],
  templateUrl: './puplic.component.html',
  styleUrl: '../main/main.component.scss',
})
export class PuplicComponent {}
