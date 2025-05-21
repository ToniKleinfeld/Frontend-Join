import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AddTaskData } from '../../../shared/interfaces/interfaces.model';
import { BackendService } from '../../../shared/service/backend.service';
import { InitialsPipe } from '../../../shared/pipes/initials.pipe';
import { FormatUserNamePipe } from '../../../shared/pipes/format-user-name.pipe';
import { Router } from '@angular/router';
import { BaseTaskFormComponent } from '@app/shared/base/base-taskform.component';

@Component({
  selector: 'app-taskform',
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InitialsPipe,
    FormatUserNamePipe,
  ],
  templateUrl: './taskform.component.html',
  styleUrls: [
    './taskform.component.scss',
    './taskform-assignto.component.scss',
    './taskform-prio-buttons.component.scss',
    './taskform-subtask.component.scss',
  ],
})
export class TaskformComponent extends BaseTaskFormComponent {
  constructor(backendService: BackendService, router: Router) {
    super(backendService, router);
  }

  /**
   *  Send  addTaskData to backend , when form is valid
   * @param form
   */
  override submit(form: NgForm) {
    if (form.valid) {
      this.addTaskData.rubric = this.rubric;
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
