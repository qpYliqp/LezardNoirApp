import {Component, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {Step, StepList, StepPanel, Stepper} from 'primeng/stepper';
import {CommonModule} from '@angular/common';
import {BookCreationDTO} from './model/BookCreationDTO';
import {FormBookDetails} from './form-book-details/form-book-details';
import {BookFormStore} from './store/BookFormStore';
import {FormBookMarketing} from './form-book-marketing/form-book-marketing';
import {BookFormService} from './service/book-form-service';
import {FormBookAuthors} from './form-book-authors/form-book-authors';


@Component({
  selector: 'app-form-create-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonDirective,
    Stepper,
    StepList,
    Step,
    StepPanel,
    FormsModule,
    FormBookDetails,
    FormBookMarketing,
    FormBookAuthors,

  ],
  templateUrl: './form-create-book.html',
  providers: [BookFormStore, BookFormService],
  styleUrls: ['./form-create-book.css']
})


export class FormCreateBook implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  currentStep: number = 0;

  book: BookCreationDTO = new BookCreationDTO();
  bookFormStore = inject(BookFormStore);
  bookFormService = inject(BookFormService);


  @ViewChild(FormBookDetails) formBookDetail?: FormBookDetails;
  @ViewChild(FormBookMarketing) formBookMarketing?: FormBookMarketing;
  @ViewChild(FormBookAuthors) formBookAuthor?: FormBookAuthors;


  nextStep() {
    switch (this.currentStep) {
      case 0:
        if (this.formBookDetail?.onSubmit()) {
          this.currentStep++;
        }
        break;

      case 1:
        if (this.formBookMarketing?.onSubmit()) {
          this.currentStep++;
        }
        break;
      case 2:
        if (this.formBookAuthor?.onSubmit()) {
          this.bookFormService.createBook(this.bookFormStore.book());
          this.closeBookForm();
        }

        break;


      default:
        break;
    }
  }

  previousStep() {
    if (this.currentStep > 0)
      this.currentStep--;
  }

  closeBookForm() {
    this.bookFormStore.resetBook();
    this.closeModal.emit();
  }


  ngOnInit() {

  }
}
