import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTaskData } from '../../../shared/interfaces/interfaces.model';
import { InitialsPipe } from '../../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-smallcard',
  imports: [CommonModule, InitialsPipe],
  templateUrl: './smallcard.component.html',
  styleUrl: './smallcard.component.scss',
})
export class SmallcardComponent {
  isMobile: boolean = window.innerWidth < 681;

  @Input() data!: GetTaskData;
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

  countDoneSubtasks() {
    let countDoneSubs = this.data.subtasks.filter((sub) => sub.done == true);
    return countDoneSubs.length;
  }

  calcCurrentSubFiller(){
    
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 681;
  }
}
