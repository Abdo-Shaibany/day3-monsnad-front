import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bread } from 'src/app/core/models/bread.model';
import { PostModel } from 'src/app/core/models/posts.model';
import { APIService } from 'src/app/core/services/api.service';
import { MessageService } from 'src/app/core/services/message.service';
import { SignalService } from 'src/app/core/services/signal.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
})
export class PostFormComponent {
  postGroup!: FormGroup;

  isSubmitValid = false;
  isSubmitting = false;

  currentItemId?: string;

  breads: Bread[] = [
    {
      label: 'posts',
      link: ['posts'],
    },
  ];

  currentBread = 'adding new post';
  isLoading = false;

  getControl(controlName: string) {
    return this.postGroup.get(controlName) as FormControl;
  }

  initForm() {
    this.postGroup = this.fb.group({
      title: [null, Validators.required],
      content: [null],
      id: [null],
      category: [null, Validators.required],
      imageId: [null]
    });
  }

  onSubmit() {
    if (!this.isSubmitValid) return;
    this.isLoading = true;

    if (!this.currentItemId)
      this.apiService.createItem<PostModel>(this.postGroup.value, "posts").subscribe({
        next: (_) => {
          this.singalService.publishSignal("posts-list");
          this.messageService.publishMessage({
            message: "تمت عملية الاضافة بنجاح",
            type: 'success',
            duration: 3000,
          })
          this.utilService.goBack();
        },
        error: (error) => {
          this.messageService.publishMessage({
            message: error?.msg ?? "حصل خطا ما",
            type: 'error',
            duration: 3000,
          });
          this.isLoading = false;
        }
      })
    else this.apiService.updateItem<PostModel>(this.postGroup.value, "posts").subscribe({
      next: (_) => {
        this.singalService.publishSignal("posts-list");
        this.messageService.publishMessage({
          message: "تمت عملية الاضافة بنجاح",
          type: 'success',
          duration: 3000,
        })
        this.utilService.goBack();
      },
      error: (error) => {
        this.messageService.publishMessage({
          message: error.error.message,
          type: 'error',
          duration: 3000,
        });
        this.isLoading = false;
      }
    })
  }

  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private utilService: UtilService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private singalService: SignalService
  ) {
    this.initForm();
    this.listenToStatues();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentItemId = id;
      this.isLoading = true;
      this.fetchDataAndMapIt(id);
    }
  }

  listenToStatues() {
    this.postGroup.statusChanges.subscribe((_) => {
      this.isSubmitValid = this.postGroup.valid;
    })

  }

  fetchDataAndMapIt(id: string) {
    this.apiService.getOne<PostModel>(id, 'posts').subscribe((res) => {
      this.postGroup.patchValue(res);
      this.postGroup.updateValueAndValidity();
      this.isLoading = false;
    });
  }

}
