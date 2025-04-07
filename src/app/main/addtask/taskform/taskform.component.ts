import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-taskform',
  imports: [CommonModule, FormsModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.scss',
})
export class TaskformComponent {
  showAssingedToList: boolean = false;
  editingIndex: number = -1;
  editingSubtaskValue: string = '';

  addtaskdata: { prio: string; subtasks: { task: string; done: boolean }[] } = {
    prio: 'medium',
    subtasks: [],
  };

  subtask: { task: string; done: boolean } = {
    task: '',
    done: false,
  };

  /**
   * Add the subtask to addtaskdata when taks is filled
   */
  createSubTask() {
    if (this.subtask.task && this.subtask.task != '') {
      this.addtaskdata.subtasks.push({ ...this.subtask });
    }
    this.subtask.task = '';
  }

  /**
   * set the current index to editingIndex an make a copy of current subtask for edit
   * @param index
   */
  editSubTask(index: number) {
    this.editingIndex = index;
    this.editingSubtaskValue = this.addtaskdata.subtasks[index].task;
  }

  /**
   * delete the task from addtaskdata.subtasks
   * @param index
   */
  delteSubTask(index: number) {
    this.addtaskdata.subtasks.splice(index, 1);

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
    this.addtaskdata.subtasks[index].task = this.editingSubtaskValue;
    this.editingIndex = -1;
    this.editingSubtaskValue = '';
  }
}
