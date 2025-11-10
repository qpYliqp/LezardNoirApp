import {Component, inject, ViewChild} from '@angular/core';
import {ProductionStepService} from '../../../../services/ProductionStepService/production-step.service';
import {FormsModule, NgForm} from '@angular/forms';
import {ProductionStep} from '../../../../models/ProductionStep';

@Component({
  selector: 'app-form-book-steps',
  imports: [
    FormsModule
  ],
  providers: [ProductionStepService],
  templateUrl: './form-book-steps.component.html',
  styleUrl: './form-book-steps.component.css'
})
export class FormBookSteps {
  @ViewChild('formBookSteps') formBookSteps?: NgForm;
  allProductionSteps: ProductionStep[] = [];

  productionStepService = inject(ProductionStepService);

  ngOnInit() {
    this.loadAllProductionSteps();
    console.log(this.allProductionSteps);
  }


  loadAllProductionSteps() {
    this.productionStepService.getAllProductionStep().subscribe({
      next: (data) => {
        this.allProductionSteps = data;
        console.log('Liste des auteurs :', this.allProductionSteps);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des auteurs', err);
      }
    });
  }

}
