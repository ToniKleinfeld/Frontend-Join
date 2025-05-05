import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { BackendService } from '../../shared/service/backend.service';
import { Subscription } from 'rxjs';
import { AddTaskData } from '../../shared/interfaces/interfaces.model';
import { SummaryItem } from '../../shared/interfaces/interfaces.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [CommonModule, DatePipe],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss', './summary-mobile.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  private _tasks = signal<AddTaskData[]>([]);
  readonly tasks = this._tasks.asReadonly();
  private subTasks = new Subscription();

  constructor(private backendService: BackendService) {
    this.subTasks.add(
      this.backendService.getRequest<AddTaskData[]>('tasks').subscribe({
        next: (tasks) => {
          this._tasks.set(tasks);
          this.updateSummary();
          this.checkScreenSize();
        },
        error: (err) => console.error('Fehler beim Laden der Nutzer:', err),
      })
    );
  }

  /**
   * Destroy subTask when change Component
   */
  ngOnDestroy(): void {
    this.subTasks.unsubscribe();
  }

  showAnimation = false;
  isMobile: boolean = window.innerWidth < 920;
  isLandscape: boolean = window.innerHeight < 601;

  ngOnInit() {
    this.checkScreenSize();
    this.checkWelcomeAnimation();
  }

  private summaryTemplate: SummaryItem[] = [
    {
      task: 'Tasks Urgent',
      imgpath: 'urgent',
      class: 'largeBox',
      count: null,
      date: null,
    },
    {
      task: 'Tasks in Board',
      imgpath: 'taskcount',
      class: 'smallBox',
      count: null,
    },
    {
      task: 'Tasks To-do',
      imgpath: 'todo',
      class: 'smallBox toDo',
      count: null,
    },
    {
      task: 'Tasks in Progress',
      imgpath: 'progresstasks',
      class: 'smallBox',
      count: null,
    },
    {
      task: 'Awaiting Feedback',
      imgpath: 'feedback',
      class: 'smallBox',
      count: null,
    },
    {
      task: 'Tasks Done',
      imgpath: 'taskdone',
      class: 'smallBox',
      count: null,
    },
  ];

  /**
   * Count and filter , tasks rubric and for urgent tasks / date
   * @returns
   */
  private getCountsByRubric(): Record<string, number> {
    const all = this._tasks();
    return {
      all: all.length,
      urgentFuture: all.filter(
        (t) => t.prio === 'urgent' && new Date(t.due_date) >= new Date()
      ).length,
      todo: all.filter((t) => t.rubric === 'To do').length,
      inProgress: all.filter((t) => t.rubric === 'In progress').length,
      awaitFeedback: all.filter((t) => t.rubric === 'Await feedback').length,
      done: all.filter((t) => t.rubric === 'Done').length,
    };
  }

  /**
   * filter the urgent dates , which will come next
   *
   * @returns next urgent date , from Today
   */
  private getNextUrgentDueDate(): string | null {
    const today = new Date();
    const futureUrgents = this._tasks()
      .filter((t) => t.prio === 'urgent')
      .map((t) => new Date(t.due_date))
      .filter((d) => d >= today)
      .sort((a, b) => a.getTime() - b.getTime());

    return futureUrgents.length
      ? futureUrgents[0].toISOString().split('T')[0]
      : null;
  }
  // TODO: Prüfen , wenn kein urgent datum vorliegt!

  private _summaryTasks = signal<SummaryItem[]>(this.summaryTemplate);
  readonly summaryTasks = this._summaryTasks.asReadonly();

  /**
   * fill the template with current filtert data
   */
  private updateSummary() {
    const counts = this.getCountsByRubric();
    const nextUrgentDate = this.getNextUrgentDueDate();

    const updated = this.summaryTemplate.map((item) => {
      switch (item.task) {
        case 'Tasks Urgent':
          return {
            ...item,
            count: counts['urgentFuture'],
            date: nextUrgentDate,
          };
        case 'Tasks in Board':
          return { ...item, count: counts['all'] };
        case 'Tasks To-do':
          return { ...item, count: counts['todo'] };
        case 'Tasks in Progress':
          return { ...item, count: counts['inProgress'] };
        case 'Awaiting Feedback':
          return { ...item, count: counts['awaitFeedback'] };
        case 'Tasks Done':
          return { ...item, count: counts['done'] };
        default:
          return item;
      }
    });

    this._summaryTasks.set(updated);
  }

  /**
   * Watch for window size change under 1024px, call funktion to swap array.object positions
   */
  @HostListener('window:resize', [])
  onResize() {
    const newIsMobile = window.innerWidth < 920;
    const newIsLandscape = window.innerHeight < 601;

    if (newIsMobile !== this.isMobile) {
      this.isMobile = newIsMobile;
      this.swapTasks(1, 2);
    }

    this.isLandscape = newIsLandscape;
  }

  /**
   * oninit check sessional storage if animationShown still played on this login, only on mobile
   */
  checkWelcomeAnimation() {
    const animationShown = sessionStorage.getItem('animationShown');
    if (!animationShown) {
      this.showAnimation = true;
      setTimeout(() => {
        sessionStorage.setItem('animationShown', 'true');
      }, 2000);
    }
  }

  /**
   * Check on loading if screen-size under 920px , yes -> call swap-tasks
   */
  checkScreenSize() {
    if (window.innerWidth < 920) {
      this.swapTasks(1, 2);
    }
  }

  /**
   * Swap the position of object in the Array for mobile version
   *
   * @param index1
   * @param index2
   */
  swapTasks(index1: number, index2: number) {
    this._summaryTasks.update((current) => {

      const arr = [...current];
      if (
        index1 >= 0 &&
        index1 < arr.length &&
        index2 >= 0 &&
        index2 < arr.length
      ) {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
      }
      return arr;
    });
  }
}
