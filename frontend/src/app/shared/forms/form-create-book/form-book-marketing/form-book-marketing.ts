import {Component, inject, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {FloatLabel} from 'primeng/floatlabel';
import {BookMarketingFormDTO} from './model/BookMarketingFormDTO';
import {BookFormStore} from '../store/BookFormStore';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-form-book-marketing',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    FormsModule,
    Textarea
  ],
  templateUrl: './form-book-marketing.html',
  styleUrl: './form-book-marketing.css'
})
export class FormBookMarketing {

  bookMarketing: BookMarketingFormDTO = new BookMarketingFormDTO();
  bookFormStore = inject(BookFormStore);
  hasSubmited: boolean = false;

  @ViewChild('formBookMarketing') formBookMarketing?: NgForm;

  ngOnInit() {
    const bookFromStore = this.bookFormStore.book();
    if (bookFromStore) {
      this.bookMarketing = {...bookFromStore};
    }
  }

  public onSubmit(): boolean {
    console.log("submit")
    this.hasSubmited = true;
    if (this.formBookMarketing && this.formBookMarketing.valid) {
      this.bookFormStore.updateBook(this.bookMarketing);
      this.hasSubmited = false;
      return true;
    }
    return false

  }

}
