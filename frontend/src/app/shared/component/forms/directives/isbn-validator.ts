import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[isbnValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: IsbnValidator,
    multi: true
  }]
})
export class IsbnValidator implements Validator {

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const isValid = this.isValidISBN(control.value);
    return isValid ? null : {
      invalidIsbnFormat: {
        message: 'ISBN ne respecte pas les normes'
      }
    };
  }


  private isValidISBN(isbn: string): boolean {
    if (!isbn) return false;
    if (isbn.length === 13) {
      return this.isValidISBN13(isbn);
    } else {
      return false;
    }
  }

  private isValidISBN13(isbn: string): boolean {
    if (!/^97[89]\d{10}$/.test(isbn)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(isbn[i]);
      sum += digit * (i % 2 === 0 ? 1 : 3);
    }

    const checkDigit = (10 - (sum % 10)) % 10;

    return checkDigit === parseInt(isbn[12]);
  }
}
