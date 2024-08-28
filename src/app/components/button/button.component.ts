import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from 'src/app/core/models/action.model';
import { Button } from 'src/app/core/models/button.model';
import { ActionHandlerService } from 'src/app/core/services/action-handler.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input({ required: true }) meta!: Action;
  @Output() onClick = new EventEmitter();

  processAction() {
    this.onClick.emit();
    if (this.meta.type) {
      this.actionHandlerService.processAction(this.meta);
    }
  }

  constructor(private actionHandlerService: ActionHandlerService) {}
}
