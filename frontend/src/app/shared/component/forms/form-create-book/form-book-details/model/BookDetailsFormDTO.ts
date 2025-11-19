export interface IBookDetailsForm {
  title: string | null;
  isbn: string | null;
  price: number | null;
  pages: number | null;
  releaseDate: Date | null;
  nuart: string | null;
  coverFile: File | null;
}
