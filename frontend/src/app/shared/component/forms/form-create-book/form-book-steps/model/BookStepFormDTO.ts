import {ProductionStep} from '../../../../../models/ProductionStep';
import {Status} from '../../../../../models/Status';

export class BookStepFormDTO {
  productionStep!: ProductionStep;
  status!: Status;
  releaseDate!: Date | null;
}
