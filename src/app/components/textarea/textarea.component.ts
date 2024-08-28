import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
})
export class TextareaComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) key!: string;
  @Input({ required: false }) classes: string = 'w-full';
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) isSubmitted!: boolean;
  @Input({ required: false }) errorMessage?: string;
  @Input({ required: false }) showOptional?: boolean;
}
