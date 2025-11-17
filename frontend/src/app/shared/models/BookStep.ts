import {ProductionStep} from './ProductionStep';
import {Status} from './Status';

export class BookStep {
  id!: number;
  productionStep!: ProductionStep;
  status!: Status;
  endDate!: Date | null;

  constructor(data: Partial<BookStep> = {}) {
    Object.assign(this, data);
  }
}
