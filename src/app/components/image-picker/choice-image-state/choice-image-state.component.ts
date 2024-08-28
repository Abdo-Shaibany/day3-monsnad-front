import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-choice-image-state',
  templateUrl: './choice-image-state.component.html',
})
export class ChoiceImageStateComponent {
  @Input({ required: true }) key!: string;

  @Output() onFileSelected = new EventEmitter<Event>();
}
