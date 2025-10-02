export class Book {
  id: number;
  title: string;
  coverUrl: string | null = null;

  constructor(data: any) {
    this.id = Number(data.id);
    this.title = String(data.title);
    if (data.coverUrl) {
      this.coverUrl = data.coverUrl;
    }
  }
}

