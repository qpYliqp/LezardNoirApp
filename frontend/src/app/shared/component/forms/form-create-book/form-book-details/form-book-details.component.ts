import {Component, inject, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {ImageUpload} from '../../../image-upload/image-upload.component';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {BookDetailsFormDTO} from './model/BookDetailsFormDTO';
import {BookFormStore} from '../store/BookFormStore';
import {IsbnValidator} from '../../directives/isbn-validator';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';

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
  providers: [BookFormStore, provideNgxMask()],
  templateUrl: './form-book-details.component.html',
  styleUrl: './form-book-details.component.css'
})
export class FormBookDetails {

  bookDetail: BookDetailsFormDTO = new BookDetailsFormDTO();
  hasSubmited: boolean = false;


  bookFormStore = inject(BookFormStore);
  @ViewChild('formBookDetail') formBookDetail?: NgForm;

  ngOnInit() {
    const bookFromStore = this.bookFormStore.book();
    if (bookFromStore) {
      // this.bookDetail = {...bookFromStore};
      this.bookDetail.title = bookFromStore.title;
    }
    console.log(this.bookDetail)
  }

  onImageSelected(file: File) {
    this.bookDetail.coverFile = file;
  }

  public onSubmit(): boolean {
    this.hasSubmited = true;
    if (this.formBookDetail && this.formBookDetail.valid) {
      this.hasSubmited = false;
      this.bookFormStore.updateBook(this.bookDetail);
      return true;
    }
    return false;
  }


}
