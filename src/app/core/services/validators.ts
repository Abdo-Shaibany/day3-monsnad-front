// auth.service.ts
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  passwordMatchValidator(control: FormGroup): { [key: string]: boolean } {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    console.log(control.valid, password === confirmPassword)
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
  
    return {};
  }
}