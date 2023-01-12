import { DatePipe } from '@angular/common';
import {
  AbstractControl,
  ValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors
} from '@angular/forms';

export class CustomValidators {
  static datepipe: any;
  constructor() { }

  static onlyChar(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('^[a-zA-Z ]*$');
      if (re.test(control.value)) {
        return null;
      } else {
        return { onlyChar: true };
      }
    };
  }

  static mustMatch(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['mustMatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }



}