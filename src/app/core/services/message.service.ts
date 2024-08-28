import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSubject: BehaviorSubject<Message | undefined> =
    new BehaviorSubject<Message | undefined>(undefined);
  public message$: Observable<Message | undefined> =
    this.messageSubject.asObservable();

  publishMessage(message: Message): void {
    this.messageSubject.next(message);
  }
}
