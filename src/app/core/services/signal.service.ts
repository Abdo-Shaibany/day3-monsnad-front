import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  private signalSubject: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>(undefined);
  public signal$: Observable<string | undefined> =
    this.signalSubject.asObservable();

  publishSignal(signal: string): void {
    this.signalSubject.next(signal);
  }
}
