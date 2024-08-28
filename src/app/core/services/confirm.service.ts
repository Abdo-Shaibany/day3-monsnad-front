import { Injectable } from '@angular/core';
import { Confirm } from '../models/confirm.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private confirmSubject: BehaviorSubject<Confirm | undefined> =
    new BehaviorSubject<Confirm | undefined>(undefined);

  public confirm$: Observable<Confirm | undefined> =
    this.confirmSubject.asObservable();

  confirm(confirm: Confirm): void {
    this.confirmSubject.next(confirm);
  }
}
