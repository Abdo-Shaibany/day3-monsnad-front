import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/auth.model';
import { LayoutOne } from 'src/app/core/models/layout-one.model';
import { RequestQuery } from 'src/app/core/models/query.model';
import { ResponseList } from 'src/app/core/models/response-list.model';
import { APIService } from 'src/app/core/services/api.service';
import { SignalService } from 'src/app/core/services/signal.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
})
export class SuppliersListComponent implements OnInit {
  unsubscribe$ = new Subject();

  meta: LayoutOne = {
    title: 'المستخدمين',
    table: {
      columns: [
        {
          key: 'id',
          label: 'ID',
          isSortable: false,
        },
        {
          key: 'username',
          label: 'اسم المستخدم',
          isSortable: false,
        },
        {
          key: 'gmail',
          label: 'الإيميل',
          isSortable: false,
        },
        {
          key: 'role',
          label: 'اسم الدور',
          isSortable: false,
        },

      ],
      meta: {
        isSelectable: true,
      },
      row: [
        {
          class: 'flex justify-start',
          items: [
            {
              key: 'id',
              type: 'text',
            },
          ],
        },
        {
          class: 'flex justify-start',
          items: [
            {
              key: 'username',
              type: 'text',
            },
          ],
        },
        {
          class: 'flex justify-start',
          items: [
            {
              type: 'text',
              resolve: (item: User) => item.email ?? ''
            },
          ],
        },
        {
          class: 'flex justify-start',
          items: [
            {
              type: 'text',
              resolve: (item: User) => item.role?.name ?? ''
            },
          ],
        },

      ],
    },
  };

  listData: ResponseList<any> = {
    items: [],
    pagination: {
      totalItems: 10,
      currentPage: 0,
      pageSize: 10,
    },
  };

  isLoading = true;

  query: RequestQuery = {
    pagination: {
      pageSize: 10,
      currentPage: 0,
    },
  };

  ngOnInit(): void {
    this.fetchData(this.query);
    this.signalService.signal$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (signal) => {
        if (!signal) return;
        if (signal === 'users-list') this.fetchData(this.query);
      },
    });
  }

  fetchData(query: RequestQuery): void {
    this.isLoading = true;
    this.apiService
      .getPaged<any>(query, 'user/getPaged')
      .subscribe({
        next: (data) => {
          this.listData = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        },
      });
  }

  constructor(
    private apiService: APIService,
    private utilService: UtilService,
    private signalService: SignalService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
  }
}
