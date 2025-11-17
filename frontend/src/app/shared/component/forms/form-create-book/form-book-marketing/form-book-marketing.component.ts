import {Component, effect, inject, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {FloatLabel} from 'primeng/floatlabel';
import {IBookMarketingForm} from './model/BookMarketingFormDTO';
import {Textarea} from 'primeng/textarea';
import {BookFormFacadeService} from '../service/book-form-facade.service';

@Component({
  selector: 'app-form-book-marketing',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    FormsModule,
    Textarea
  ],
  templateUrl: './form-book-marketing.component.html',
  styleUrl: './form-book-marketing.component.css'
})
export class FormBookMarketing {

  bookMarketing: IBookMarketingForm = {
    hook: null,
    marketing: null,
    summary: null,
    note: null
  };
  readonly facade = inject(BookFormFacadeService);
  hasSubmited: boolean = false;

  @ViewChild('formBookMarketing') formBookMarketing?: NgForm;

  constructor() {
    effect(() => {
      const book = this.facade.book();
      this.bookMarketing = {
        hook: book.hook,
        marketing: book.marketing,
        summary: book.summary,
        note: book.note
      };
    });
  }

  ngOnInit() {
  }

  public onSubmit(): boolean {
    console.log("submit")
    this.hasSubmited = true;
    if (this.formBookMarketing && this.formBookMarketing.valid) {
      this.facade.updateBook(this.bookMarketing);
      this.hasSubmited = false;
      return true;
    }
    return false

  }

}
