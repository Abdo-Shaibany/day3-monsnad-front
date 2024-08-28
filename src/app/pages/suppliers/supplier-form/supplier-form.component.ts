import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bread } from 'src/app/core/models/bread.model';

import { APIService } from 'src/app/core/services/api.service';
import { MessageService } from 'src/app/core/services/message.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
})
export class SupplierFormComponent {
  supplierGroup!: FormGroup;

  isSubmitValid = false;
  isSubmitting = false;
  currentStep = '0';

  currentItemId?: string;

  breads: Bread[] = [
    {
      label: 'الموردين',
      link: ['home', 'suppliers-manager', 'suppliers'],
    },
  ];

  currentBread = 'اضافة مورد';

  isLoading = false;

  steps = ['0', '1'];

  goBack() {
    this.currentStep = '0';
    this.isStepValid();
  }

  onSubmit() {
    if (this.isSubmitting) return;
    if (!this.isSubmitValid) return;

    if (this.currentStep === '0') {
      this.currentStep = '1';
      this.isStepValid();
    } else {
      this.isLoading = true;
      this.isSubmitting = true;

      // const supplier = SupplierFormToCreateSupplier(this.supplierGroup.value);

      // if (this.currentItemId) {
      //   this.updateItem(supplier);
      // } else this.createItem(supplier);
    }
  }

  // updateItem(supplier: CreateSupplier) {
  //   this.apiService
  //     .updateItem<SupplierGetOne>(supplier, 'suppliers')
  //     .subscribe({
  //       next: (_) => {
  //         this.isLoading = false;
  //         this.utilService.goBack();
  //         this.messageService.publishMessage({
  //           message: 'تم إنشاء بيانات المورد وحسابه البنكي بنجاح',
  //           type: 'success',
  //           duration: 3000,
  //         });
  //       },

  //       error: (error) => {
  //         this.isLoading = false;
  //         this.isSubmitting = false;

  //         console.log(
  //           error,
  //           ' submitting supplier error when creating supplier'
  //         );

  //         this.messageService.publishMessage({
  //           message: 'حصل خطأ عند انشاء المورد',
  //           type: 'error',
  //           duration: 3000,
  //         });
  //       },
  //     });
  // }

  // createItem(supplier: CreateSupplier) {
  //   this.apiService
  //     .createItem<SupplierGetOne>(supplier, 'suppliers')
  //     .subscribe({
  //       next: (_) => {
  //         this.isLoading = false;
  //         this.utilService.goBack();
  //         this.messageService.publishMessage({
  //           message: 'تم إنشاء بيانات المورد وحسابه البنكي بنجاح',
  //           type: 'success',
  //           duration: 3000,
  //         });
  //       },

  //       error: (error) => {
  //         this.isLoading = false;
  //         this.isSubmitting = false;

  //         console.log(
  //           error,
  //           ' submitting supplier error when creating supplier'
  //         );

  //         this.messageService.publishMessage({
  //           message: 'حصل خطأ عند انشاء المورد',
  //           type: 'error',
  //           duration: 3000,
  //         });
  //       },
  //     });
  // }

  stepOne(target: string) {
    return (this.supplierGroup.get('0') as FormGroup).controls[
      target
    ] as FormControl;
  }

  stepTwo(target: string) {
    return (this.supplierGroup.get('1') as FormGroup).controls[
      target
    ] as FormControl;
  }

  initForm() {
    this.supplierGroup = this.fb.group<any>({
      '0': this.fb.group({
        id: [null],
        name: [null, [Validators.required]],
        company: [null],
        company_address: [null],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^7[37801]\d{7}$/)],
        ],
      }),
      '1': this.fb.group({
        id: [null],
        account_number: [null, [Validators.required]],
        account_name: [null, [Validators.required]],
        bankId: [null, [Validators.required]],
        bank_currencyId: [null, [Validators.required]],
        bank_locationId: [null, [Validators.required]],
      }),
    });
  }

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

  fetchDataAndMapIt(id: string) {
    // this.apiService.getOne<SupplierGetOne>(id, 'suppliers').subscribe((res) => {
    //   this.supplierGroup.patchValue(SupplierGetOneToSupplierForm(res));
    //   this.supplierGroup.updateValueAndValidity();
    //   this.isStepValid();
    //   this.isLoading = false;
    // });
  }

  listenToStatues() {
    for (let step of this.steps) {
      this.supplierGroup.get(step)?.statusChanges.subscribe((_) => {
        this.isStepValid();
      });
    }
  }

  isStepValid() {
    const status = this.supplierGroup;
    for (let step of this.steps) {
      if (this.currentStep === step && status.get(step)?.status === 'VALID') {
        this.isSubmitValid = true;
      } else if (
        this.currentStep === step &&
        status.get(step)?.status === 'INVALID'
      ) {
        this.isSubmitValid = false;
      }
    }
  }
}
