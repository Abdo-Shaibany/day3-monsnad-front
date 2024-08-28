import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Bread } from 'src/app/core/models/bread.model';
import { Image } from 'src/app/core/models/image.model';
import { PostModel } from 'src/app/core/models/posts.model';
import { APIService } from 'src/app/core/services/api.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
})
export class PostViewComponent {
  isLoading = true;
  post?: PostModel;
  _imageUrl?: string;


  breads: Bread[] = [
    {
      label: 'posts',
      link: ['posts'],
    },
  ];

  currentBread = 'view post';

  constructor(
    private apiService: APIService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.fetchData(id);
    }
  }

  getImage() {
    this.apiService.getOne<Image>(this.post!.id.toString(), 'images').subscribe({
      next: (res) => {
        this._imageUrl = res.url;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
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

  fetchData(id: string) {
    this.apiService.getOne<PostModel>(id, "posts").subscribe({
      next: (data) => {
        this.post = data;
        this.getImage();
      }
    })
  }

  getHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.post!.content)
  }

  getImageUrl() {
    return this.utilService.getImageUrl(this._imageUrl!);
  }

}
