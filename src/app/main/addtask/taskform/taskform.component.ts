import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AddTaskData } from '../../../shared/interfaces/task.model';
import { Subtask } from '../../../shared/interfaces/task.model';

@Component({
  selector: 'app-taskform',
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './taskform.component.html',
  styleUrls: [
    './taskform.component.scss',
    './taskform-assignto.component.scss',
    './taskform-prio-buttons.component.scss',
    './taskform-subtask.component.scss',
  ],
})
export class TaskformComponent {
  isMobile: boolean = window.innerWidth < 1200;
  showAssingedToList: boolean = false;
  editingIndex: number = -1;
  editingSubtaskValue: string = '';

  addTaskData: AddTaskData = {
    rubric: 'To do',
    title: '',
    description: '',
    assignedusers: [],
    duedate: '',
    prio: 'medium',
    subtasks: [],
  };

  deflaultAddTaks: AddTaskData = { ...this.addTaskData };

  subtask: Subtask = {
    task: '',
    done: false,
  };

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 1200;
  }

  /**
   * Add the subtask to addtaskdata when taks is filled
   */
  createSubTask() {
    if (this.subtask.task && this.subtask.task != '') {
      this.addTaskData.subtasks.push({ ...this.subtask });
    }
    this.subtask.task = '';
  }

  /**
   * set the current index to editingIndex an make a copy of current subtask for edit
   * @param index
   */
  editSubTask(index: number) {
    this.editingIndex = index;
    this.editingSubtaskValue = this.addTaskData.subtasks[index].task;
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
    this.addTaskData.subtasks[index].task = this.editingSubtaskValue;
    this.editingIndex = -1;
    this.editingSubtaskValue = '';
  }

  clearAll(){


    console.log(this.deflaultAddTaks, this.addTaskData)
  }
}
