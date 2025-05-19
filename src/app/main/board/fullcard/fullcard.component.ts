import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { GetTaskData } from '../../../shared/interfaces/interfaces.model';
import { InitialsPipe } from '../../../shared/pipes/initials.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fullcard',
  imports: [InitialsPipe, CommonModule],
  templateUrl: './fullcard.component.html',
  styleUrl: './fullcard.component.scss',
})
export class FullcardComponent {
  @Input() task!: GetTaskData;
  @Output() clicked = new EventEmitter<void>();

  editMode : boolean = false;

  onClick() {
    this.clicked.emit();
  }
}
