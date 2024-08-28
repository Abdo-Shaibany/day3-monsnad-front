import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LayoutTwo } from 'src/app/core/models/layout-two.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { RequestQuery } from 'src/app/core/models/query.model';
import { ResponseList } from 'src/app/core/models/response-list.model';
import { Sort } from 'src/app/core/models/sort.model';

@Component({
  selector: 'app-layout-two',
  templateUrl: './layout-two.component.html',
})
export class LayoutTwoComponent {
  @Input({ required: true }) meta!: LayoutTwo;
  @Input({ required: true }) listData!: ResponseList<any>;
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) query!: RequestQuery;

  @Output() fetchData = new EventEmitter<RequestQuery>();
  @Output() processCreateAction = new EventEmitter<void>();


  // itemsSelected: Product[] = [];

  sort?: Sort;
  searchValue: string = '';

  onPageChange(pagination: Pagination) {
    this.query.pagination = pagination;
    this.fetchData.emit(this.query);
  }

  onSort(sort?: Sort) {
    this.sort = sort;
    this.query.sorts = sort ? [sort] : [];
    this.fetchData.emit(this.query);
  }

  onSearch(searchValue: string) {
    this.searchValue = searchValue;
    this.query.search = searchValue;
    this.fetchData.emit(this.query);
  }

  onItemsSelected(items: any[]) {
    // this.itemsSelected = items;
  }

  onOptionSelect(item: any, type: string) {

  }

  constructor() { }
}
