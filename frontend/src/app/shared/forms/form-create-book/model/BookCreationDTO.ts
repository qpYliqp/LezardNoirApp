export class BookCreationDTO
{
  title: string = "";
  isbn: string = "";
  price: number | null = null;
  pages: number | null = null;
  nuart: string=  "";
  date: Date | null = null;
  summary: string = "";
  hook: string = "";
  coverFileName: string = "";
}
