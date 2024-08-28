import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginGroup!: FormGroup;

  isSubmitValid = false;
  isSubmitting = false;

  isLoading = false;

  onSubmit() {
    if (!this.isSubmitValid) return;
    this.isLoading = true;

    this.apiService.createItem<string>(this.loginGroup.value, "auth/login").subscribe({
      next: (data) => {
        this.authService.storeToken(data);
        this.isLoading = false;
        this.utilService.gotoLink(['home']);
      },
      error: (error) => {
        this.messageService.publishMessage({
          message: `حصل خطأ عند تسجيل الدخول\n${error.msg}`,
          type: 'error',
          duration: 3000,
        });
        this.isLoading = false;
      }
    });

  }

  public get emailControl(): FormControl {
    return this.loginGroup.get("email") as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.loginGroup.get("password") as FormControl;
  }

  initForm() {
    this.loginGroup = this.fb.group<any>({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private utilService: UtilService,
    private authService: AuthService,
    private messageService: MessageService,
  ) {
    this.initForm();
    this.listenToStatues();
  }


  listenToStatues() {
    this.loginGroup.statusChanges.subscribe((_) => {
      this.isSubmitValid = this.loginGroup.valid;
    });
  }

}
