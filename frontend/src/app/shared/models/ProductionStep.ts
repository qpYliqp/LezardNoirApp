export class ProductionStep {
  id!: number;
  name!: string;

  constructor(data: Partial<ProductionStep> = {}) {
    Object.assign(this, data);
  }
}
