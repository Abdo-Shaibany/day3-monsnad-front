import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { UtilService } from 'src/app/core/services/util.service';
import { saveAs } from 'file-saver';
import { Image } from 'src/app/core/models/image.model';

@Component({
  selector: 'app-image-preview-state',
  templateUrl: './image-preview-state.component.html',
})
export class ImagePreviewStateComponent implements OnInit {
  @Input({ required: true }) image!: Image;
  @Output() onRemove = new EventEmitter<Image>();

  imageInfo?: {
    name: string;
    size: number;
    type: string;
  };

  constructor(
    private utilService: UtilService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.utilService
      .getImageDetails(this.utilService.getImageUrl(this.image.url))
      .then((imageInfo) => {
        this.imageInfo = imageInfo ? imageInfo : undefined;
      })
      .catch((error: Error) => {
        this.messageService.publishMessage({
          type: 'error',
          message:
            error.message ?? ' حصل خطأ عند محاولة الحصول على معلومات الصورة',
          duration: 3000,
        });
      });
  }

  getImage(): string {
    return this.utilService.getImageUrl(this.image.thumbnail_url);
  }

  getImageSize() {
    if (this.imageInfo!.size > 1024 * 1024) {
      return (this.imageInfo!.size / (1024 * 1024)).toFixed(2) + ' MB';
    }

    return (this.imageInfo!.size / 1024).toFixed(2) + ' KB';
  }

  onFileDownload() {
    const url = this.utilService.getImageUrl(this.image.url);
    const name = url.split('/')[url.split('/').length - 1];
    saveAs(this.utilService.getImageUrl(this.image.url), name);
  }
}
