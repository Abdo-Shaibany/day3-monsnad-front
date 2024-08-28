import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) searchValue!: string;
  @Input({ required: false }) classes: string = 'w-60';
  @Output() onSearch = new EventEmitter<string>();

  private querySubject = new Subject<string>();

  constructor() {
    this.querySubject.pipe(debounceTime(1000)).subscribe((value) => {
      this.onSearch.emit(value);
    });
  }

  onInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.querySubject.next(target.value);
  }
}
