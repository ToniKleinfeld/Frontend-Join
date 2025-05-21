import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTaskFormComponent } from '@app/shared/base/base-taskform.component';
import { Router } from '@angular/router';
import { BackendService } from '@app/shared/service/backend.service';
import { InitialsPipe } from '../../../shared/pipes/initials.pipe';
import { FormatUserNamePipe } from '../../../shared/pipes/format-user-name.pipe';
import {
  AddTaskData,
  GetTaskData,
} from '@app/shared/interfaces/interfaces.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-editform',
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InitialsPipe,
    FormatUserNamePipe,
  ],
  templateUrl: './editform.component.html',
  styleUrls: [
    '../../addtask/taskform/taskform.component.scss',
    '../../addtask/taskform/taskform-assignto.component.scss',
    '../../addtask/taskform/taskform-prio-buttons.component.scss',
    '../../addtask/taskform/taskform-subtask.component.scss',
    './editform.component.scss',
  ],
})
export class EditformComponent extends BaseTaskFormComponent {
  constructor(backendService: BackendService, router: Router) {
    super(backendService, router);
  }

  @Input() data!: GetTaskData;

  override submit(form: NgForm) {
    if (form.valid) {
      this.backendService
        .postRequest<AddTaskData>('tasks', this.addTaskData)
        .subscribe({
          next: () => {
            this.showSuccessMsg = true;
            setTimeout(() => {
              this.showSuccessMsg = false;
              this.router.navigate(['/board']);
              this.closeOverlay.emit();
            }, 2000);
            this.clearAll(form);
          },
        });
    }
  }
}
