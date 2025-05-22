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
  styleUrls: [
    './smallcard.component.scss',
    './smallcard.mobile.component.scss',
  ],
})
export class SmallcardComponent {
  isMobile: boolean = window.innerWidth <= 1200;
  openMenu: boolean = false;
  nextRubric?: number;

  @Input() data!: GetTaskData;
  @Output() clicked = new EventEmitter<void>();
  @Output() setNewRubric = new EventEmitter<{
    board: string;
  }>();

  taskboards: string[] = ['To do', 'In progress', 'Await feedback', 'Done'];

  onClick() {
    this.clicked.emit();
  }

  /**
   *
   * @returns Count of subtasks with state done
   */
  countDoneSubtasks() {
    let countDoneSubs = this.data.subtasks.filter((sub) => sub.done == true);
    return countDoneSubs.length;
  }

  /**
   *
   * @returns return % for Subtasks filler state
   */
  calcCurrentSubFiller() {
    const doneCount = this.countDoneSubtasks();
    const totalCount = this.data.subtasks.length;

    if (totalCount === 0) {
      return 0;
    }

    const percentage = (doneCount / totalCount) * 100;
    return Math.round(percentage);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth <= 1200;
  }

  /**
   * Html render only the rubric not assigned to this class
   */
  removeRubric() {
    const idx = this.taskboards.indexOf(this.data.rubric);

    this.nextRubric = idx

    this.taskboards = this.taskboards.filter((r) => r !== this.data.rubric);
  }

  /**
   * open the Menu to swap rubric
   */
  showSwapMenu() {
    this.openMenu = !this.openMenu;
    this.removeRubric()
  }

  /**
   *  change the rubric of Task
   */
  changeProgressTo(newBoard: string) {
    this.setNewRubric.emit({ board: newBoard });
    this.showSwapMenu();
  }
}
