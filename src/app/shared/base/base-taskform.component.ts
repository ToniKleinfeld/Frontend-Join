import {
  Directive,
  HostListener,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  signal,
  WritableSignal,
  computed,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../service/backend.service';
import { AddTaskData, Subtask, User } from '..//interfaces/interfaces.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Directive()
export abstract class BaseTaskFormComponent implements OnDestroy {
  private _users = signal<User[]>([]);
  readonly users = this._users.asReadonly();
  private subUser = new Subscription();

  constructor(protected  backendService: BackendService, protected  router: Router) {
    this.subUser.add(
      this.backendService.getRequest<User[]>('users').subscribe({
        next: (users) => this._users.set(users),
        error: (err) => console.error('Fehler beim Laden der Nutzer:', err),
      })
    );
  }

  @Input() rubric: string = 'To do';
  @Output() closeOverlay = new EventEmitter<void>();

  isMobile: boolean = window.innerWidth < 1200;
  showAssingedToList: boolean = false;
  editingIndex: number = -1;
  editingSubtaskValue: string = '';
  showSuccessMsg: boolean = false;
  today: string = new Date().toISOString().split('T')[0];

  defaultAddTask: AddTaskData = {
    rubric: 'To do',
    title: '',
    description: '',
    assigned_users: [],
    due_date: '',
    category: '',
    prio: 'medium',
    subtasks: [],
  };

  subtask: Subtask = {
    title: '',
    done: false,
  };

  addTaskData: AddTaskData = JSON.parse(JSON.stringify(this.defaultAddTask));
  filterText: WritableSignal<string> = signal('');

  /**
   * Filter the users when inputfiel have value , or return full users()
   */
  filteredUsers = computed(() => {
    const txt = this.filterText().trim().toLowerCase();
    if (!txt) {
      return this.users();
    }

    return this.users().filter((u) => u.username.toLowerCase().includes(txt));
  });

  /**
   * Add/remove the choosen User.id to the array : assigned_users when checkbox checked/unchecked
   *
   * @param userId  User.id
   * @param checked Checkbox
   */
  toggleAssignUser(userId: string, checked: boolean): void {
    const list = this.addTaskData.assigned_users;
    const index = list.indexOf(userId);
    if (checked && index === -1) {
      list.push(userId);
    } else if (!checked && index !== -1) {
      list.splice(index, 1);
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 1200;
  }

  abstract submit(form: NgForm): void;

  /**
   * Destroy subUser
   */
  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }

  /**
   * Add the subtask to addtaskdata when taks is filled
   */
  createSubTask() {
    if (this.subtask.title && this.subtask.title != '') {
      this.addTaskData.subtasks.push({ ...this.subtask });
    }
    this.subtask.title = '';
  }

  /**
   * set the current index to editingIndex an make a copy of current subtask for edit
   * @param index
   */
  editSubTask(index: number) {
    this.editingIndex = index;
    this.editingSubtaskValue = this.addTaskData.subtasks[index].title;
  }

  /**
   * delete the task from addtaskdata.subtasks
   * @param index
   */
  delteSubTask(index: number) {
    this.addTaskData.subtasks.splice(index, 1);

    if (this.editingIndex === index) {
      this.editingIndex = -1;
      this.editingSubtaskValue = '';
    }
  }

  /**
   * Save the edit input to the wanted task
   * @param index
   */
  saveEditSubtask(index: number) {
    this.addTaskData.subtasks[index].title = this.editingSubtaskValue;
    this.editingIndex = -1;
    this.editingSubtaskValue = '';
  }

  /**
   * Own Validation, if DueDate input is before current date
   *
   * @param control input.value dueData
   * @returns obj or null
   */
  validateDueDate(control: any): { [key: string]: any } | null {
    const inputDate = new Date(control);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      return { pastDate: true };
    }

    return null;
  }

  /**
   *calls funktion to get feeback if input is valid or not
   * @param control input.value dueData
   */
  onDateChange(control: any): void {
    const error = this.validateDueDate(control.control.value);
    control.control.setErrors(error);
  }

  /**
   * Reset the Form to default
   */
  clearAll(form: NgForm) {
    this.addTaskData = JSON.parse(JSON.stringify(this.defaultAddTask));
    this.filterText.set('');
    form.resetForm();
  }
}
