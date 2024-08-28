import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
})
export class InputTextComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) key!: string;
  @Input({ required: false }) classes: string = 'w-full';
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) isSubmitted!: boolean;
  @Input({ required: false }) errorMessage?: string;
  @Input({ required: false }) showOptional?: boolean;
  @Input() type: "text" | "password" = "text";
}
