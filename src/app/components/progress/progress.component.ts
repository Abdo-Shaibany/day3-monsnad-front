import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
})
export class ProgressComponent {
  @Input({ required: true }) value!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) progress!: number;

  getProgressWidth() {
    return 'width: ' + this.progress * 100 + '%';
  }
}
