import {Component, OnInit, signal} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { Button, ButtonDirective, ButtonIcon } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Step, StepList, StepPanel, Stepper } from 'primeng/stepper';
import { Textarea } from 'primeng/textarea';
import { DatePicker } from 'primeng/datepicker';
import { FileUpload } from 'primeng/fileupload';
import { PrimeTemplate } from 'primeng/api';
import { ImageUpload } from '../../image-upload/image-upload';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-create-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Dialog,
    ButtonDirective,
    ButtonIcon,
    Button,
    FloatLabel,
    InputText,
    InputNumber,
    Stepper,
    StepList,
    Step,
    StepPanel,
    Textarea,
    DatePicker,
    FileUpload,
    PrimeTemplate,
    ImageUpload,
  ],
  templateUrl: './form-create-book.html',
  styleUrls: ['./form-create-book.css']
})


export class FormCreateBook implements OnInit {

  currentStep = 1;
  isStepping: boolean = false;
  bookForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.bookForm = this.fb.group({
      step1: this.fb.group({
        title: ['', Validators.required],
        isbn: ['', Validators.required],
        price: [null, [Validators.required, Validators.min(0)]],
        pages: [null, [Validators.required, Validators.min(1)]],
        date: [null, Validators.required],
        nuart: ['', Validators.required],
        coverFileName: [''],
      }),
      step2: this.fb.group({
        summary: [''],
        hook: ['', [Validators.required, Validators.minLength(1)]],
        marketing: ['', [Validators.required, Validators.minLength(1)]],
      })
    });
  }

  onImageSelected(file: File) {
    this.bookForm.patchValue({
      coverFileName: file.name
    });
  }

  goToStep(step: number) {
    if (step > this.currentStep) {
      if (!this.isStepValid(this.currentStep)) {
        this.isStepping = true;
        this.markStepInvalidControlsAsTouched(this.currentStep);
        return;
      }
    }
    this.currentStep = step;
    this.isStepping = false;
  }

  isStepValid(step: number): boolean {
    const stepGroup = this.bookForm.get(`step${step}`) as FormGroup;
    return stepGroup?.valid ?? false;
  }

  private markStepInvalidControlsAsTouched(step: number) {
    const stepGroup = this.bookForm.get(`step${step}`) as FormGroup;
    if (!stepGroup) return;
    console.log('here ?')
    Object.values(stepGroup.controls).forEach(control => {
      if (control.invalid) {
        control.markAsTouched();
      }
    });
  }

  submit() {
    if (this.bookForm.valid) {
      console.log('Book créé : ', this.bookForm.value);
    } else {
      this.bookForm.markAllAsTouched();
    }
  }

  showError(controlPath: string): string {
    const control = this.bookForm.get(controlPath);
    const hasError = control ? control.invalid && (control.touched || control.dirty) && this.isStepping : false;
    return hasError ? 'text-error' : 'text-secondary';
  }
}
