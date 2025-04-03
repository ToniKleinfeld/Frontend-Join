import { Component } from '@angular/core';
import { TaskformComponent } from "./taskform/taskform.component";

@Component({
  selector: 'app-addtask',
  imports: [TaskformComponent],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.scss'
})
export class AddtaskComponent {

}
