import {ErrorResponse} from './error-response';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

export class BackEndValidation {
  errorResponse: ErrorResponse;

  constructor(private form: FormGroup) {
  }

  bindAllControls(): BackEndValidation {
    Object.keys(this.form.controls).forEach(key => {
      this.bindControl(this.form.get(key));
    });
    return this;
  }

  bind(...controls: AbstractControl[]): BackEndValidation {
    controls.forEach(control => this.bindControl(control));
    return this;
  }

  private bindControl(control: AbstractControl): BackEndValidation {
    const validator = control.validator;
    const validators: ValidatorFn[] = [];
    if (validator) {
      validators.push(validator);
    }
    validators.push(this.validate.bind(this));
    control.setValidators(validators);
    return this;
  }

  registerHttpErrorResponse(errResp: HttpErrorResponse) {
    this.errorResponse = errResp.error;
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).updateValueAndValidity();
    });
  }

  validate(control: AbstractControl): { [s: string]: boolean } {
    if (this.errorResponse && this.errorResponse.errors) {
      for (const err of this.errorResponse.errors) {
        const c = this.form.get(err.propertyPath);
        if (c && control === c && c.value === err.invalidValue) {
          return {[err.propertyPath]: true};
        }
      }
    }
    return null;
  }

}
