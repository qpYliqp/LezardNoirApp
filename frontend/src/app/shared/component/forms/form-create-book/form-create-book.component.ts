import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {Step, StepList, StepPanel, Stepper} from 'primeng/stepper';
import {CommonModule} from '@angular/common';
import {FormBookDetails} from './form-book-details/form-book-details.component';
import {FormBookMarketing} from './form-book-marketing/form-book-marketing.component';
import {FormBookAuthors} from './form-book-authors/form-book-authors.component';
import {FormBookSteps} from './form-book-steps/form-book-steps.component';
import {BookFormSignalStore} from './store/book-form.store';
import {BookFormFacadeService} from './service/book-form-facade.service';
import {BookFormService} from './service/book-form.service';
import {BookCreationDTO} from './model/BookCreationDTO';


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
    FormBookSteps,

  ],
  templateUrl: './form-create-book.component.html',
  providers: [BookFormSignalStore, BookFormService, BookFormFacadeService],
  styleUrls: ['./form-create-book.component.css']
})


export class FormCreateBook implements OnInit, OnChanges {
  @Input() bookToEdit?: BookCreationDTO;
  @Output() closeModal = new EventEmitter<void>();

  currentStep: number = 0;

  readonly facade = inject(BookFormFacadeService);


  @ViewChild(FormBookDetails) formBookDetail?: FormBookDetails;
  @ViewChild(FormBookMarketing) formBookMarketing?: FormBookMarketing;
  @ViewChild(FormBookAuthors) formBookAuthor?: FormBookAuthors;
  @ViewChild(FormBookSteps) formBookSteps?: FormBookSteps;


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
          this.currentStep++;
        }
        break;


      case 3:
        if (this.formBookSteps?.onSubmit()) {
          this.submitForm();
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
    this.facade.reset();
    this.closeModal.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookToEdit']) {
      if (this.bookToEdit) {
        this.facade.initializeForEdit(this.bookToEdit);
      }
    }
  }

  ngOnInit() {
    if (this.bookToEdit) {
      this.facade.initializeForEdit(this.bookToEdit);
    } else {
      this.facade.initializeForCreate();
    }
  }

  private submitForm(): void {
    this.facade.submit().subscribe({
      next: (book) => {
        this.closeBookForm();
      },
      error: (error) => {
        console.error(`Book ${this.facade.mode()} failed:`, error);
      }
    });
  }
}
