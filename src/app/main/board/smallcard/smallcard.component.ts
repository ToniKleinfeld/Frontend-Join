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

  /**
   *
   * @returns Count of subtasks with state done
   */
  countDoneSubtasks() {
    let countDoneSubs = this.data.subtasks.filter((sub) => sub.done == true);
    console.log(this.data)
    return countDoneSubs.length;
  }

  /**
   *
   * @returns return % for Subtasks filler state
   */
  calcCurrentSubFiller() {
    const doneCount = this.countDoneSubtasks();
    const totalCount = this.data.assigned_users.length;

    if (totalCount === 0) {
      return 0;
    }

    const percentage = (doneCount / totalCount) * 100;
    return Math.round(percentage);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 681;
  }
}
