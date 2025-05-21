import { Component, HostListener, signal, computed } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../shared/service/backend.service';
import { TaskformComponent } from '../addtask/taskform/taskform.component';
import { SmallcardComponent } from './smallcard/smallcard.component';
import { GetTaskData } from '../../shared/interfaces/interfaces.model';
import { FullcardComponent } from './fullcard/fullcard.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-board',
  imports: [
    ButtonComponent,
    CommonModule,
    TaskformComponent,
    SmallcardComponent,
    FullcardComponent,
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  private _tasks = signal<GetTaskData[]>([]);

  readonly tasks = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const all = this._tasks();
    if (!term) {
      return all;
    }
    return all.filter(
      (t) =>
        t.title.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term)
    );
  });

  searchTerm = signal<string>('');

  constructor(private backendService: BackendService, private router: Router) {
    this.loadTasks();
  }

  overlay: boolean = false;
  overlayContent: string = '';
  selectedTaskId = signal<string | null>(null);
  openedTask = computed(() => {
    const id = this.selectedTaskId();
    return id ? this._tasks().find((t) => t.id === id) ?? null : null;
  });

  isMobile: boolean = window.innerWidth < 1200;

  filterTasks(currentBoard: string) {
    return this.tasks().filter((t) => t.rubric == currentBoard);
  }

  taskboards: string[] = ['To do', 'In progress', 'Await feedback', 'Done'];
  createTasksRubric: string = 'To do';

  /**
   * Load current User Tasks
   */
  loadTasks() {
    this.backendService.getRequest<GetTaskData[]>('tasks').subscribe({
      next: (tasks) => this._tasks.set(tasks),
      error: (err) => console.error('Fehler beim Laden der Tasks:', err),
    });
  }

  /**
   * close overlay and load tasks for refresh
   */
  closeOverlay() {
    this.overlay = false;
    this.overlayContent = '';
    this.loadTasks();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 1200;
  }

  draggedCardIndex: string = '-1';
  draggedFromColumnIndex: string = '-1';
  draggedover: string = '-1';

  /**
   *
   * @param event Dragstart
   * @param board wich collum is the task from
   * @param task
   */
  onDragStart(board: string, task: GetTaskData): void {
    if (task.id) {
      this.draggedCardIndex = task.id;
      this.draggedFromColumnIndex = board;
    }
  }

  /**
   * save the variables of wich board the card come from and the tasks id
   *
   * @param event DragEvent
   * @param board wich collum is hoverd
   */
  onDragOver(event: DragEvent, board: string): void {
    this.draggedover = board;
    event.preventDefault();
  }

  /**
   * update rubric in backend
   *
   * @param event drop event
   * @param board wich colum dropped
   * @returns nothing when dropped same collum
   */
  onDrop(event: DragEvent, board: string): void {
    event.preventDefault();
    if (
      this.draggedCardIndex === '-1' ||
      this.draggedFromColumnIndex === '-1' ||
      board === this.draggedFromColumnIndex
    ) {
      return;
    }
    let newRubric = { rubric: board };
    this.patchTask(this.draggedCardIndex, newRubric);
  }

  /**
   * reset the drag info to '-1'
   */
  onDragEnd(event: DragEvent): void {
    this.draggedCardIndex = '-1';
    this.draggedFromColumnIndex = '-1';
    this.draggedover = '-1';
  }

  /**
   * Patch wanded data
   *
   * @param id tasks ID
   * @param data data want send to backend
   */
  patchTask(id: string, data: object) {
    this.backendService.patchRequest(`tasks/${id}`, data).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => console.error('Fehler beim abändern des Tasks:', err),
    });
  }

  /**
   * Open add task overlay or route to addtasks when mobile
   * @param board
   */
  openCreateNewTask(board: string | '') {
    if (!this.isMobile) {
      this.overlay = true;
      this.overlayContent = 'newtask';
      this.createTasksRubric = board || 'To do';
    } else {
      this.router.navigate(['/addtask']);
    }
  }

  /**
   *  Open Single task in overlay
   * @param id
   */
  openTask(id: string) {
    this.selectedTaskId.set(id);
    this.overlayContent = 'cardinfo';
    this.overlay = true;
  }

  filterTasksId(id: string) {
    return this.tasks().filter((t) => t.id == id);
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
