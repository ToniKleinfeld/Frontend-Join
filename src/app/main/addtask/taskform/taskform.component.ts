import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-taskform',
  imports: [CommonModule,FormsModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.scss'
})
export class TaskformComponent {
showAssingedToList:boolean = false;

addtaskdata = {
  prio : 'medium',
  subtask: '',
}

}
