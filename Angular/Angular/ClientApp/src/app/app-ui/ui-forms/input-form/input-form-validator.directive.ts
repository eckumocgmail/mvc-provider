import { Input} from '@angular/core';
import { Directive} from '@angular/core';
import { AsyncValidator} from '@angular/forms';
import { AbstractControl} from '@angular/forms';
import { ValidationErrors} from '@angular/forms';
import { Observable} from 'rxjs';
import { of} from 'rxjs';





@Directive({
  selector: '[appInputFormValidator]'
})
export class InputFormValidator implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors|null> {
      return of({custom: true});
  }

}

