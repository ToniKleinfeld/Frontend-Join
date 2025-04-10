import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-taskform',
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.scss',
})
export class TaskformComponent {
  isMobile: boolean = window.innerWidth < 910;
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

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 910;
  }

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
