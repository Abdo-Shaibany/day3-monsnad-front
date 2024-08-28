import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-one',
  templateUrl: './add-new-one.component.html',
})
export class AddNewOneComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: false }) classes?: string;

  @Output() onAdd = new EventEmitter<void>();
}
