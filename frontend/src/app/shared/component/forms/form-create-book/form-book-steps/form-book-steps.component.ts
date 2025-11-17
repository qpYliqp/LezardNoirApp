import {Component, inject, ViewChild} from '@angular/core';
import {ProductionStepService} from '../../../../services/ProductionStepService/production-step.service';
import {FormsModule, NgForm} from '@angular/forms';
import {ProductionStep} from '../../../../models/ProductionStep';
import {StatusService} from '../../../../services/StatusService/status.service';
import {Status} from '../../../../models/Status';
import {IBookStepForm} from './model/BookStepFormDTO';
import {forkJoin} from 'rxjs';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {BookFormStore} from '../store/BookFormStore';

@Component({
  selector: 'app-form-book-steps',
  imports: [
    FormsModule,
    Select,
    DatePicker,
    FloatLabel
  ],
  providers: [ProductionStepService, StatusService],
  templateUrl: './form-book-steps.component.html',
  styleUrl: './form-book-steps.component.css'
})
export class FormBookSteps {

  productionStepService = inject(ProductionStepService);
  statusService = inject(StatusService);
  bookFormStore = inject(BookFormStore);


  allProductionSteps: ProductionStep[] = [];
  allStatus: Status[] = [];

  bookStepsDTO: IBookStepForm[] = [];
  hasSubmited: boolean = false;

  @ViewChild('formBookSteps') formBookSteps?: NgForm;

  ngOnInit() {
    forkJoin({
      steps: this.productionStepService.getAllProductionStep(),
      statuses: this.statusService.getAllStatus()
    }).subscribe(({steps, statuses}) => {
      this.allProductionSteps = steps;
      this.allStatus = statuses;

      this.bookStepsDTO = steps.map(step => ({
        productionStep: step,
        status: statuses[0],
        endDate: null
      }));

      console.log("Book steps initialized:", this.bookStepsDTO);
    });
  }


  public onSubmit(): boolean {
    console.log("submit")
    this.hasSubmited = true;
    if (this.formBookSteps && this.formBookSteps.valid) {
      this.bookFormStore.updateBook({
        bookSteps: this.bookStepsDTO
      });
      this.hasSubmited = false;
      return true;
    }
    return false

  }


}
