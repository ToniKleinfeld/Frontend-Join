import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = 'Button';
  @Input() design: 'primary'| 'fullsize' | 'secondary' | 'deactive' | 'submit' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() size: 'small' | 'large' = 'small';
  @Input() icon: '' | 'addcontact' | 'clear' | 'check' | 'add' = '';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
