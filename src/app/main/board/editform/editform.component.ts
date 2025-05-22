import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
export class EditformComponent extends BaseTaskFormComponent implements OnInit {
  constructor(backendService: BackendService, router: Router) {
    super(backendService, router);
  }

  @Input() data!: GetTaskData;
  @Output() loadTasks = new EventEmitter<void>();

  ngOnInit(): void {
    let filteredAddTask: { assigned_users: string[] } = {
      assigned_users: this.data.assigned_users.map((u) => u.id!),
    };

    this.addTaskData = {
      rubric: this.data.rubric,
      title: this.data.title,
      description: this.data.description,
      assigned_users: filteredAddTask.assigned_users,
      due_date: this.data.due_date,
      category: this.data.category,
      prio: this.data.prio,
      subtasks: this.data.subtasks,
    };
  }

  override submit(form: NgForm) {
    if (form.valid) {
      this.backendService
        .patchRequest<AddTaskData>(`tasks/${this.data.id}`, this.addTaskData)
        .subscribe({
          next: (responde) => {
            this.loadTasks.emit();
          },
        });
    }
  }
}
