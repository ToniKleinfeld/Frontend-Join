import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [ButtonComponent,CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  taskboards:string[]= ['To do','In progress','Await feedback', 'Done']

}
