export interface Book
{
  id: number;
  title: string;
}

export interface BooksByLetter
{
  key: string,
  books: Book[]

}
