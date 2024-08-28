import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
})
export class TagComponent {
  @Input({ required: true }) text!: String;
}
