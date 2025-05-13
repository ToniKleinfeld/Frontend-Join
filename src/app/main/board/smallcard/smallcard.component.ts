import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskData } from '../../../shared/interfaces/interfaces.model';

@Component({
  selector: 'app-smallcard',
  imports: [CommonModule],
  templateUrl: './smallcard.component.html',
  styleUrl: './smallcard.component.scss',
})
export class SmallcardComponent {
  isMobile: boolean = window.innerWidth < 681;

  data?: AddTaskData;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 681;
  }
}
