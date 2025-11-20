export class Status {
  id!: number;
  name!: string;

  constructor(data: Partial<Status> = {}) {
    Object.assign(this, data);
  }
}
