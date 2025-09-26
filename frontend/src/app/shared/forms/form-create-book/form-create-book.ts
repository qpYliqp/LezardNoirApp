import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {Step, StepList, StepPanel, Stepper} from 'primeng/stepper';
import {CommonModule} from '@angular/common';
import {BookCreationDTO} from './model/BookCreationDTO';
import {FormBookDetails} from './form-book-details/form-book-details';
import {BookFormStore} from './store/BookFormStore';
import {FormBookMarketing} from './form-book-marketing/form-book-marketing';
import {BookFormService} from './service/book-form-service';


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
  ],
  templateUrl: './form-create-book.html',
  providers: [BookFormStore, BookFormService],
  styleUrls: ['./form-create-book.css']
})


export class FormCreateBook implements OnInit {

  currentStep: number = 0;

  book: BookCreationDTO = new BookCreationDTO();
  bookFormStore = inject(BookFormStore);
  bookFormService = inject(BookFormService);


  @ViewChild(FormBookDetails) formBookDetail?: FormBookDetails;
  @ViewChild(FormBookMarketing) formBookMarketing?: FormBookMarketing;


  nextStep() {
    switch (this.currentStep) {
      case 0:
        if (this.formBookDetail?.onSubmit()) {
          this.currentStep++;
        }
        break;

      case 1:
        if (this.formBookMarketing?.onSubmit()) {
          console.log("non")
          this.currentStep++;
        }
        console.log("wtf")
        break;

      case 2:
        console.log("oui?")
        this.bookFormService.updateBook(this.bookFormStore.book());
        break;


      default:
        break;
    }
  }

  previousStep() {
    if (this.currentStep > 0)
      this.currentStep--;
  }


  ngOnInit() {

  }
}
