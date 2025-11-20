import {Component, effect, inject, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {ImageUpload} from '../../../image-upload/image-upload.component';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {IBookDetailsForm} from './model/BookDetailsFormDTO';
import {IsbnValidator} from '../../directives/isbn-validator';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {BookFormFacadeService} from '../service/book-form-facade.service';

@Component({
  selector: 'app-form-book-details',
  imports: [
    ReactiveFormsModule,
    DatePicker,
    FloatLabel,
    ImageUpload,
    InputNumber,
    InputText,
    FormsModule,
    IsbnValidator,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './form-book-details.component.html',
  styleUrl: './form-book-details.component.css'
})
export class FormBookDetails {

  bookDetail: IBookDetailsForm = {
    title: null,
    isbn: null,
    price: null,
    pages: null,
    releaseDate: null,
    nuart: null,
    coverFile: null
  };
  hasSubmited: boolean = false;


  readonly facade = inject(BookFormFacadeService);
  @ViewChild('formBookDetail') formBookDetail?: NgForm;

  constructor() {
    // Use effect to sync store changes to local form
    effect(() => {
      const book = this.facade.book();
      this.bookDetail = {
        title: book.title,
        isbn: book.isbn,
        price: book.price,
        pages: book.pages,
        releaseDate: book.releaseDate,
        nuart: book.nuart,
        coverFile: book.coverFile
      };
    });
  }

  ngOnInit() {
    console.log(this.bookDetail);
  }

  onImageSelected(file: File) {
    this.bookDetail.coverFile = file;
  }

  public onSubmit(): boolean {
    this.hasSubmited = true;
    if (this.formBookDetail && this.formBookDetail.valid) {
      this.hasSubmited = false;
      this.facade.updateBook({
        title: this.bookDetail.title,
        isbn: this.bookDetail.isbn,
        price: this.bookDetail.price,
        pages: this.bookDetail.pages,
        releaseDate: this.bookDetail.releaseDate,
        nuart: this.bookDetail.nuart,
        coverFile: this.bookDetail.coverFile
      });
      return true;
    }
    return false;
  }


}
