import {ProductionStep} from '../../../../../models/ProductionStep';
import {Status} from '../../../../../models/Status';

export interface BookStepFormDTO {
  productionStep: ProductionStep;
  status: Status;
  endDate: Date | null;
}


