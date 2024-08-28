import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from 'src/app/core/models/pagination.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input({ required: true }) pagination!: Pagination;
  @Output() onPageChange: EventEmitter<Pagination> =
    new EventEmitter<Pagination>();

  getItemsRange() {
    return (
      this.pagination.currentPage * 10 +
      1 +
      ' - ' +
      (this.pagination.currentPage + 1) * this.pagination.pageSize +
      ' من ' +
      this.pagination.totalItems +
      ' عنصر '
    );
  }

  getPagesRange() {
    if (this.pagination.totalItems == null) {
      console.error(
        'no total items in pagination! check the bitches of backend'
      );
      return '';
    }
    return (
      this.pagination.currentPage +
      1 +
      ' من ' +
      Math.ceil(this.pagination.totalItems / this.pagination.pageSize) +
      ' صفحة '
    );
  }

  isLastPage() {
    if (this.pagination.totalItems == null) {
      console.error(
        'no total items in pagination! check the bitches of backend'
      );
      return true;
    }
    if (this.pagination.totalItems == 0) {
      return true;
    }
    return (
      this.pagination.currentPage + 1 ===
      Math.ceil(this.pagination.totalItems / this.pagination.pageSize)
    );
  }

  onClickNext() {
    if (this.isLastPage()) return;
    this.onPageChange.emit({
      ...this.pagination,
      currentPage: this.pagination.currentPage + 1,
    });
  }

  onClickPrev() {
    if (this.pagination.currentPage === 0) return;
    this.onPageChange.emit({
      ...this.pagination,
      currentPage: this.pagination.currentPage - 1,
    });
  }
}
