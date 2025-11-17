import {ProductionStep} from '../../../../../models/ProductionStep';
import {Status} from '../../../../../models/Status';

export interface IBookStepForm {
  productionStep: ProductionStep;
  status: Status;
  endDate: Date | null;
}

// Alias for backward compatibility
export type BookStepFormDTO = IBookStepForm;
