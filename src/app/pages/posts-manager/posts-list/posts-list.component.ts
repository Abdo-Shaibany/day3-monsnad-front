import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/core/models/action.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { RequestQuery } from 'src/app/core/models/query.model';
import { ResponseList } from 'src/app/core/models/response-list.model';
import { APIService } from 'src/app/core/services/api.service';
import { UtilService } from 'src/app/core/services/util.service';
import { PostModel } from 'src/app/core/models/posts.model';
import { MessageService } from 'src/app/core/services/message.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent implements OnInit {
  posts: ResponseList<PostModel> = {
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

  addPostAction: Action = {
    label: "Add Post",
    textColor: "text-white",
    bgColor: "bg-blue-400"
  }


  onPageChange(pagination: Pagination) {
    this.query.pagination = pagination;
    this.fetchData(this.query);
  }

  fetchData(query: RequestQuery): void {
    this.isLoading = true;
    this.apiService
      .getPaged<any>(query, 'posts/getPaged')
      .subscribe({
        next: (data) => {
          this.posts = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        },
      });
  }

  logout() {
    this.authService.removeToken();
    this.utilService.gotoLink(['auth', 'login']);
  }

  getRelativeTimeString(date: Date | number, lang = navigator.language): string {
    date = new Date(date);

    const timeMs = typeof date === "number" ? date : date.getTime();
    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

    const cutoffs = [60, 3600, 86400, 604800, 2592000, 31536000, Infinity];
    const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

    const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));
    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
  }

  stripTags(content: string) {
    return content.replace(/<\/?[^>]+(>|$)/g, '');
  }

  viewPost(id: number) {
    this.utilService.gotoLink(['posts', 'post-view', id.toString()]);
  }

  editPost(id: number) {
    this.utilService.gotoLink(['posts', 'post-form', id.toString()]);
  }

  deletePost(id: number) {
    this.apiService.deleteOne(id.toString(), "posts").subscribe({
      next: () => {
        this.messageService.publishMessage({
          type: "success",
          message: "تم الحذف بنجاح",
          duration: 1000
        })
        this.fetchData(this.query);
      },
      error: (error) => {
        console.log(error);
        this.messageService.publishMessage({
          type: 'error',
          message: 'حصل خطأ ، الرجاء المحاولة مرة أخرى',
          duration: 2000
        })
      },
    })
  }

  addPost() {
    this.utilService.gotoLink(['posts', 'post-form']);
  }

  constructor(private utilService: UtilService, private apiService: APIService,
    private messageService: MessageService, private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchData(this.query);
  }
}
