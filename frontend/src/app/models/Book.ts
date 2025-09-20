import {apiURL} from '../../contants';

export class Book
{
  id: number;
  title: string;
  coverFileName: string | null = null;

  constructor(data: any) {
    this.id = Number(data.id);
    this.title = String(data.title);
    if(data.coverFileName)
    {
      this.coverFileName = String(apiURL + data.coverFileName)
    }
  }
}

