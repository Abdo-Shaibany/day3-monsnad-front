import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/core/models/message.model';
import { MessageService } from '../../core/services/message.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit, OnDestroy {
  message?: Message;
  show = false;
  queue: Message[] = [];
  unsubscribe$ = new Subject();

  isLocked = false;

  ngOnInit(): void {
    this.messageService.message$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (message) => {
        if (!message) return;
        if (this.isLocked) {
          this.queue.push(message);
          return;
        } else {
          this.isLocked = true;
          this.fireMessage(message);
        }
      },
    });
  }

  fireMessage(message: Message) {
    this.message = message;
    this.show = true;
    setTimeout(() => {
      this.show = false;
      setTimeout(() => {
        const nextMessage = this.queue.shift();
        if (nextMessage) this.fireMessage(nextMessage);
        else this.isLocked = false;
      }, 500);
    }, message.duration);
  }

  constructor(private messageService: MessageService) {}
  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
