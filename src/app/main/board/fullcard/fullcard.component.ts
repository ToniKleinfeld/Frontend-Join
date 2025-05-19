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
import { FormatUserNamePipe } from '../../../shared/pipes/format-user-name.pipe';

@Component({
  selector: 'app-fullcard',
  imports: [InitialsPipe, CommonModule, FormatUserNamePipe],
  templateUrl: './fullcard.component.html',
  styleUrl: './fullcard.component.scss',
})
export class FullcardComponent {
  @Input() task!: GetTaskData;
  @Output() closeOverlay = new EventEmitter<void>();

  editMode : boolean = false;

  onClick() {
    this.closeOverlay.emit();
  }
}
