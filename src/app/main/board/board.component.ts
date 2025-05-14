import { Component, HostListener, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { Subtask } from '../../shared/interfaces/interfaces.model';
import { BackendService } from '../../shared/service/backend.service';
import { TaskformComponent } from '../addtask/taskform/taskform.component';
import { SmallcardComponent } from './smallcard/smallcard.component';
import { User } from '../../shared/interfaces/interfaces.model';
import { GetTaskData } from '../../shared/interfaces/interfaces.model';
@Component({
  selector: 'app-board',
  imports: [
    ButtonComponent,
    CommonModule,
    TaskformComponent,
    SmallcardComponent,
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  private _tasks = signal<GetTaskData[]>([]);
  readonly tasks = this._tasks.asReadonly();

  constructor(private backendService: BackendService) {
    this.loadTasks();
  }

  filterTasks(currentBoard: string) {
    return this.tasks().filter((t) => t.rubric == currentBoard);
  }

  taskboards: string[] = ['To do', 'In progress', 'Await feedback', 'Done'];

  /**
   * Load current User Tasks
   */
  loadTasks() {
    this.backendService.getRequest<GetTaskData[]>('tasks').subscribe({
      next: (tasks) => this._tasks.set(tasks),
      error: (err) => console.error('Fehler beim Laden der Tasks:', err),
    });
  }

  overlay: boolean = false;
  overlayContent = '';
  isMobile: boolean = window.innerWidth < 681;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 681;
    console.log(this.tasks());
  }
}

// TODO: {
//     "rubric": "Done",
//     "prio": "urgent",
//     "assigned_users": [
//         1 , 6 , 10
//     ]
// }  BSP PATCH api/join/tasks/<id>/ user hier id nur alten müssen vorher ausgelsen werden und in die neue liste eingefügt werden, wen diese weiterhin in der liste erscheinen sollen

// TODO:
// Example Subtasks create :
// {
//   "title": "Test create subtask ",
// }
// http://127.0.0.1:8000/api/join/tasks/3/subtasks liste aller subtasks , hier von taks id 3
//
// Put / Patch :
// {
//   "title": "Test put subtask ",
//   "done": true
// }
// "done"= deflault -> false
// Delte (PUT UND PATCH)
// http://127.0.0.1:8000/api/join/tasks/3/subtasks/6/ singleview
