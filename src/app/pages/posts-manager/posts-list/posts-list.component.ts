import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/core/models/action.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { RequestQuery } from 'src/app/core/models/query.model';
import { ResponseList } from 'src/app/core/models/response-list.model';
import { APIService } from 'src/app/core/services/api.service';
import { UtilService } from 'src/app/core/services/util.service';
import { PostModel } from 'src/app/core/models/posts.model';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent implements OnInit {
  posts: ResponseList<PostModel> = {
    items: [
      {
        id: 1,
        title: "Post title",
        content: "The sun danced across the rippling waves, casting a golden glow upon the serene waters, while whispers of the wind carried secrets through the ancient trees, rustling their leaves in a symphony of mystery. Laughter echoed through the bustling streets, mingling with the aroma of freshly baked pastries from the corner bakery.",
        user: {
          id: 1,
          username: "admin",
        },
        date: new Date("2024-01-01"),
        category: "category",
        imageId: 1,
      },
      {
        id: 1,
        title: "Post title",
        content: "The sun danced across the rippling waves, casting a golden glow upon the serene waters, while whispers of the wind carried secrets through the ancient trees, rustling their leaves in a symphony of mystery. Laughter echoed through the bustling streets, mingling with the aroma of freshly baked pastries from the corner bakery.",
        user: {
          id: 1,
          username: "admin",
        },
        date: new Date("2024-01-01"),
        category: "category",
      },
      {
        id: 1,
        title: "Post title",
        content: "The sun danced across the rippling waves, casting a golden glow upon the serene waters, while whispers of the wind carried secrets through the ancient trees, rustling their leaves in a symphony of mystery. Laughter echoed through the bustling streets, mingling with the aroma of freshly baked pastries from the corner bakery.",
        user: {
          id: 1,
          username: "admin",
        },
        date: new Date("2024-01-01"),
        category: "category",
      },
      {
        id: 1,
        title: "Post title",
        content: "The sun danced across the rippling waves, casting a golden glow upon the serene waters, while whispers of the wind carried secrets through the ancient trees, rustling their leaves in a symphony of mystery. Laughter echoed through the bustling streets, mingling with the aroma of freshly baked pastries from the corner bakery.",
        user: {
          id: 1,
          username: "admin",
        },
        date: new Date("2024-01-01"),
        category: "category",
      },
    ],
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

  getRelativeTimeString(date: Date | number, lang = navigator.language): string {
    const timeMs = typeof date === "number" ? date : date.getTime();
    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

    const cutoffs = [60, 3600, 86400, 604800, 2592000, 31536000, Infinity];
    const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

    const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));
    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
  }

  viewPost(id: number) {
    this.utilService.gotoLink(['posts', 'post-view', id.toString()]);
  }

  editPost(id: number) {
    this.utilService.gotoLink(['posts', 'post-form', id.toString()]);
  }

  deletePost(id: number) {
    // TODO: delete this
    this.fetchData(this.query);
  }

  addPost() {
    this.utilService.gotoLink(['posts', 'post-form']);
  }

  constructor(private utilService: UtilService, private apiService: APIService,
  ) { }

  ngOnInit(): void {
    this.fetchData(this.query);
  }
}
