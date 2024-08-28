import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bread } from 'src/app/core/models/bread.model';
import { APIService } from 'src/app/core/services/api.service';
import { MessageService } from 'src/app/core/services/message.service';
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
      content: [null, Validators.required],
      id: [null],
      category: [null, Validators.required],
      imageId: [null]
    });
  }

  onSubmit() { }

  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private utilService: UtilService,
    private messageService: MessageService,
    private route: ActivatedRoute
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
    // this.apiService.getOne<SupplierGetOne>(id, 'suppliers').subscribe((res) => {
    //   this.supplierGroup.patchValue(SupplierGetOneToSupplierForm(res));
    //   this.supplierGroup.updateValueAndValidity();
    //   this.isStepValid();
    //   this.isLoading = false;
    // });
  }

}
