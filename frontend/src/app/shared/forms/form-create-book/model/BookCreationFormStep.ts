interface BookFormData {
  step1: {
    title: string;
    isbn: string;
    price: number | null;
    pages: number | null;
    date: Date | null;
    nuart: string;
    coverFileName: string;
  };
  step2: {
    summary: string;
    hook: string;
    marketing: string;
  };
}

enum BookCreationFormStep {
  DETAILS = 1,
  MARKETING = 2,
}
