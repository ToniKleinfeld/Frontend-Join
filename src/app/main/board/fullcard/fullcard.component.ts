import {
  Component,
  Input,
  Output,
  EventEmitter,
  Signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GetTaskData } from '../../../shared/interfaces/interfaces.model';
import { InitialsPipe } from '../../../shared/pipes/initials.pipe';
import { CommonModule } from '@angular/common';
import { FormatUserNamePipe } from '../../../shared/pipes/format-user-name.pipe';
import { BackendService } from '../../../shared/service/backend.service';
import { Subtask } from '../../../shared/interfaces/interfaces.model';
import { EditformComponent } from '../editform/editform.component';

@Component({
  selector: 'app-fullcard',
  imports: [InitialsPipe, CommonModule, FormatUserNamePipe, EditformComponent],
  templateUrl: './fullcard.component.html',
  styleUrls: ['./fullcard.component.scss','./fullcard.mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullcardComponent {
  @Input({ required: true }) task!: Signal<GetTaskData | null>;
  @Output() closeOverlay = new EventEmitter<void>();
  @Output() loadTasks = new EventEmitter<void>();

  editMode: boolean = false;

  onClick() {
    this.closeOverlay.emit();
  }

  loadTask() {
    this.loadTasks.emit();
    this.editMode = false;
  }

  constructor(private backendService: BackendService) {}

  /**
   * Patch wanded data
   *
   * @param id tasks ID
   * @param data data want send to backend
   */
  patchTask(id: string, data: object) {
    this.backendService.patchRequest(`tasks/${id}`, data).subscribe({
      next: () => {
        this.loadTasks.emit();
      },
      error: (err) => console.error('Fehler beim abändern des Tasks:', err),
    });
  }

  /**
   * patch subTask title and status done
   *
   * @param taskID
   * @param sub
   * @param check if true , only change done status , false for edit title
   */
  patchSub(taskID: string, sub: Subtask, check: boolean) {
    let data: Subtask = {
      title: sub.title,
      done: sub.done,
    };

    if (check) {
      data.done = !sub.done;
    }
    this.patchTask(`${taskID}/subtasks/${sub.id}`, data);
  }

  /**
   * Delete currewnt Task
   * @param id
   */
  delteTask(id: string) {
    this.backendService.deleteRequest(`tasks/${id}`).subscribe({
      next: () => {
        this.closeOverlay.emit();
        this.loadTasks.emit();
      },
      error: (err) => console.error('Fehler beim löschen des Kontakts:', err),
    });
  }

  changeToEdit() {
    this.editMode = true;
  }
}
