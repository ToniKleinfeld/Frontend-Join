import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { CommonModule } from '@angular/common';
import { AddTaskData } from '../../shared/interfaces/interfaces.model';
import { Subtask } from '../../shared/interfaces/interfaces.model';
import { Observable, Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BackendService } from '../../shared/service/backend.service';

@Component({
  selector: 'app-board',
  imports: [ButtonComponent,CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy{
  tasks$!: Observable<AddTaskData[]>;
  private destroy$ = new Subject<void>();

  constructor(private backendService: BackendService) {}

  taskboards:string[]= ['To do','In progress','Await feedback', 'Done']


  ngOnInit(): void {
    this.tasks$ = timer(0, 30_000).pipe(
      switchMap(() => this.backendService.getRequest<AddTaskData[]>('tasks')),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    
  }
}

// TODO: {
//     "rubric": "Done",
//     "prio": "urgent",
//     "assigned_users": [
//         1 , 6 , 10
//     ]
// }  BSP PATCH api/join/tasks/<id>/ user hier id nur alten müssen vorher ausgelsen werden und in die neue liste eingefügt werden, wen diese weiterhin in der liste erscheinen sollen

// TODO:
// Example Subtasks create :
// {
//   "title": "Test create subtask ",
// }
// http://127.0.0.1:8000/api/join/tasks/3/subtasks liste aller subtasks , hier von taks id 3
//
// Put / Patch :
// {
//   "title": "Test put subtask ",
//   "done": true
// }
// "done"= deflault -> false
// Delte (PUT UND PATCH)
// http://127.0.0.1:8000/api/join/tasks/3/subtasks/6/ singleview
