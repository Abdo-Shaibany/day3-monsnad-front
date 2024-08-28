import { Component, ElementRef, HostListener } from '@angular/core';
import { Confirm } from 'src/app/core/models/confirm.model';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmService } from 'src/app/core/services/confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {
  confirm?: Confirm;
  show = false;
  unsubscribe$ = new Subject();
  isLocked = false;

  ngOnInit(): void {
    this.confirmService.confirm$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (confirm) => {
        if (!this.isLocked && confirm) {
          this.isLocked = true;
          this.confirm = confirm;
          this.show = true;
        }
      },
    });
  }

  onConfirm() {
    this.confirm?.confirmCallback();
    this.onCancel();
  }

  onCancel() {
    this.isLocked = false;
    this.show = false;
    this.confirm = undefined;
  }

  constructor(
    private confirmService: ConfirmService,
    private eRef: ElementRef
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
