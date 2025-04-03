import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-taskform',
  imports: [CommonModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.scss'
})
export class TaskformComponent {
showAssingedToList:boolean = false;
}
