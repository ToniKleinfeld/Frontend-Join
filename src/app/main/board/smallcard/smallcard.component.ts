import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskData } from '../../../shared/interfaces/interfaces.model';
import { InitialsPipe } from '../../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-smallcard',
  imports: [CommonModule, InitialsPipe],
  templateUrl: './smallcard.component.html',
  styleUrl: './smallcard.component.scss',
})
export class SmallcardComponent {
  isMobile: boolean = window.innerWidth < 681;

  @Input() data?: AddTaskData;
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 681;
  }
}
