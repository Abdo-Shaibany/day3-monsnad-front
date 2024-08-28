import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LayoutOne } from 'src/app/core/models/layout-one.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { RequestQuery } from 'src/app/core/models/query.model';
import { ResponseList } from 'src/app/core/models/response-list.model';
import { Sort } from 'src/app/core/models/sort.model';

@Component({
  selector: 'app-layout-one',
  templateUrl: './layout-one.component.html',
})
export class LayoutOneComponent {
  @Input({ required: true }) meta!: LayoutOne;
  @Input({ required: true }) listData!: ResponseList<any>;
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) query!: RequestQuery;

  @Output() fetchData = new EventEmitter<RequestQuery>();


  // itemsSelected: Product[] = [];

  sort?: Sort;
  searchValue: string = '';

  onPageChange(pagination: Pagination) {
    this.query.pagination = pagination;
    this.fetchData.emit(this.query);
  }

  onSearch(searchValue: string) {
    this.searchValue = searchValue;
    this.query.search = searchValue;
    this.fetchData.emit(this.query);
  }

  onSort(sort?: Sort) {
    this.sort = sort;
    this.query.sorts = sort ? [sort] : [];
    this.fetchData.emit(this.query);
  }

  onItemsSelected(items: any[]) {
    // this.itemsSelected = items;
  }
}
