import { Component } from '@angular/core';
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
export class BoardComponent {
  tasks$!: Observable<AddTaskData[]>;
  private destroy$ = new Subject<void>();

  constructor(private backendService: BackendService) {}

  taskboards:string[]= ['To do','In progress','Await feedback', 'Done']


  ngOnInit(): void {
    this.tasks$ = timer(0, 30_000).pipe(
      switchMap(() => this.backendService.getRequest<AddTaskData[]>('tasks')),
      takeUntil(this.destroy$)
    );
    this.tasks$.subscribe({
      next: tasks => console.log('Aktuelle Tasks:', tasks),
      error: err => console.error('Fehler bei Tasks:', err)
    });
  }

  ngOnDestroy(): void {}
}
