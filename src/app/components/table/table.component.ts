import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from 'src/app/core/models/sort.model';
import { CellItem, Column, Table } from 'src/app/core/models/table.model';
import { ActionHandlerService } from 'src/app/core/services/action-handler.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  @Input({ required: true }) table!: Table;
  @Input({ required: true }) data!: any[];
  @Input({ required: true }) sortBy?: Sort;

  @Output() onSelectItems = new EventEmitter<any[]>();
  @Output() onSort = new EventEmitter<Sort>();
  isSelectAll = false;

  onSorting(column: Column, type: number) {
    if (!column.key) {
      console.log(
        'column has no key - focus or build the builder nigga',
        column
      );
      return;
    }

    if (type == 0) {
      this.onSort.emit(undefined);
      return;
    }

    let sort: Sort = {
      key: column.key,
      value: 'asc',
    };
    switch (type) {
      case 1:
        sort.value = 'asc';
        break;
      case -1:
        sort.value = 'desc';
        break;
    }

    this.onSort.emit(sort);
  }
  onSelectAll() {
    this.isSelectAll = !this.isSelectAll;

    this.data.forEach((item) => {
      item.selected = this.isSelectAll;
    });

    this.onSelectItems.emit(this.getSelectedItems());
  }

  onSelect(item: any) {
    item.selected = !item.selected;
    this.isSelectAll = this.data.every((item) => item.selected === true);
    console.log(this.isSelectAll, ' is selected all onSelect function');
    this.onSelectItems.emit(this.getSelectedItems());
  }

  getSelectedItems() {
    return this.data.filter((item) => item.selected);
  }

  resolveData(cell: CellItem, data: any) {
    if (cell.key) {
      return data[cell.key];
    } else if (cell.resolve) {
      return cell.resolve(data);
    } else {
      console.error('table-no-data-provider cell:', cell, ' data: ', data);
    }
  }

  resolveTagColor(cell: CellItem, data: any) {
    if (!cell.palette) {
      console.error('table-no-palette cell:', cell, ' data: ', data);
      return;
    }
    const value = this.resolveData(cell, data);
    const color = cell.palette.find((el) => el.value === value)?.color;

    if (!color) {
      console.error('table-no-color-for-value cell:', cell, ' data: ', data);
      return;
    }

    return color;
  }

  ngOnInit(): void {
    if (this.table.meta.isSelectable) {
      this.data.forEach((item) => {
        item.selected = false;
      });
    }
  }

  constructor(public actionHandlerService: ActionHandlerService) {}
}
