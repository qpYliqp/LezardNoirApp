export class BookCreationDTO {
  // title: string | null = null;
  // isbn: string | null = null;
  // price: number | null = null;
  // pages: number | null = null;
  // nuart: string | null = null;
  // date: Date | null = null;
  // summary: string | null = null;
  // hook: string | null = null;
  // marketing: string | null = null;
  // note: string | null = null;
  // coverFileName: string | null = null;
  title: string | null = "titre";
  isbn: string | null = "9782353482788";
  price: number | null = 55;
  pages: number | null = 55;
  nuart: string | null = "55";
  date: Date | null = new Date();
  summary: string | null = "summary";
  hook: string | null = "hook";
  marketing: string | null = "markeitng";
  note: string | null = null;
  coverFile: File | null = null;
}
