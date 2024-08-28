import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Image } from 'src/app/core/models/image.model';
import { APIService } from 'src/app/core/services/api.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
})
export class ImagePickerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) key!: string;
  image?: Image;

  isLoading = false;

  onFileSelected(event: Event) {
    this.isLoading = true;

    if (!event.target) return;
    if (!(event.target as HTMLInputElement).files) return;

    const file = (event.target as HTMLInputElement).files![0];

    if (!file) return;

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      this.messageService.publishMessage({
        type: 'error',
        message: 'نوع الملف غير صالح',
        duration: 3000,
      });

      return;
    }

    if (file.size > 5242880) {
      this.messageService.publishMessage({
        type: 'error',
        message: 'الصورة اكبر من 5 ميجا',
        duration: 3000,
      });

      return;
    }

    // create a formData object
    const formData = new FormData();
    formData.append('url', file);

    this.apiService.createItem<Image>(formData, 'images').subscribe({
      next: (res) => {
        this.isLoading = false;
        this.image = res;
        this.isLoading = false;
        this.control.setValue(res.id);
        this.control.updateValueAndValidity();
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.messageService.publishMessage({
          type: 'error',
          message: 'حصل خطأ عند رفع الصورة ، الرجاء المحاولة مرة أخرى',
          duration: 3000,
        });
      },
    });
  }

  onFileRemoved(image: Image) {
    this.apiService.deleteOne(image.id.toString(), 'images').subscribe({
      next: (_) => {
        this.image = undefined;
        this.control.setValue(null);
        this.control.updateValueAndValidity();
      },
      error: (error) => {
        console.error(error);
        this.messageService.publishMessage({
          type: 'error',
          message: 'حصل خطأ عند حذف الصورة ، الرجاء المحاولة مرة أخرى',
          duration: 3000,
        });
      },
    });
  }

  onFileFetched() {
    this.apiService.getOne<Image>(this.control.value, 'images').subscribe({
      next: (res) => {
        this.image = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  constructor(
    private messageService: MessageService,
    private apiService: APIService
  ) { }

  ngOnInit(): void {
    if (this.control.value && !this.image) {
      this.onFileFetched();
    }
  }

  ngOnDestroy(): void {
    this.image = undefined;
  }
}
