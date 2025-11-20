import {Component, inject, ViewChild} from '@angular/core';
import {ProductionStepService} from '../../../../services/ProductionStepService/production-step.service';
import {FormsModule, NgForm} from '@angular/forms';
import {ProductionStep} from '../../../../models/ProductionStep';
import {StatusService} from '../../../../services/StatusService/status.service';
import {Status} from '../../../../models/Status';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {BookFormFacadeService} from '../service/book-form-facade.service';
import {BookStepFormDTO} from './model/BookStepFormDTO';
import {forkJoin} from 'rxjs';

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
  readonly facade = inject(BookFormFacadeService);


  allProductionSteps: ProductionStep[] = [];
  allStatus: Status[] = [];

  bookStepsDTO: BookStepFormDTO[] = [];
  hasSubmited: boolean = false;

  @ViewChild('formBookSteps') formBookSteps?: NgForm;

  ngOnInit() {
    forkJoin({
      steps: this.productionStepService.getAllProductionStep(),
      statuses: this.statusService.getAllStatus()
    }).subscribe(({steps, statuses}) => {
      this.allProductionSteps = steps;
      this.allStatus = statuses;

      const existingBookSteps = this.facade.book().bookSteps;

      if (existingBookSteps && existingBookSteps.length > 0) {
        this.bookStepsDTO = existingBookSteps.map(s => ({
          ...s,
          endDate: s.endDate ? new Date(s.endDate) : null
        }));
      } else {
        this.bookStepsDTO = steps.map(step => ({
          productionStep: step,
          status: statuses[0],
          endDate: null
        }));
      }

    });
  }


  public onSubmit(): boolean {
    this.hasSubmited = true;
    if (this.formBookSteps && this.formBookSteps.valid) {
      this.facade.updateBook({bookSteps: this.bookStepsDTO})
      this.hasSubmited = false;
      return true;
    }
    return false

  }


}
