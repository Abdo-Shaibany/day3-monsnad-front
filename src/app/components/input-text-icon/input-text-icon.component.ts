import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text-icon',
  templateUrl: './input-text-icon.component.html',
})
export class InputTextIconComponent {
  @Input({ required: false }) label?: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) key!: string;
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) isSubmitted!: boolean;
  @Input({ required: false }) errorMessage?: string;

  @Output() onRemoveChoice = new EventEmitter<void>();
}
