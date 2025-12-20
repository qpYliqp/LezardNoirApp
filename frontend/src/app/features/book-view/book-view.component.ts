import {Component, effect, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookViewService} from './service/book-view.service';
import {FormCreateBook} from '../../shared/component/forms/form-create-book/form-create-book.component';
import {BookFormDTO} from '../../shared/component/forms/form-create-book/model/BookFormDTO';
import {Book} from '../../shared/models/Book';
import {ButtonDirective} from 'primeng/button';
import {TitlesOverviewService} from '../titles-overview/service/titles-overview.service';
import {ToastService} from '../../shared/services/ToastService/toast.service';

@Component({
  selector: 'app-book-view',
  imports: [FormCreateBook, ButtonDirective],
  providers: [BookViewService, TitlesOverviewService],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css'
})

export class BookView {
  route = inject(ActivatedRoute);
  router = inject(Router)
  bookViewService = inject(BookViewService);
  toastService = inject(ToastService);
  bookId: string = "";

  isEditing: boolean = false;
  bookToEdit?: BookFormDTO;

  book = this.bookViewService.book;

  constructor() {
    effect(() => {
      if (this.bookViewService.error()) {
        // this.toastService.showError("Livre non trouvé", "L'id " + this.bookId + " n'existe pas");
        this.router.navigate(['/board']);
      }
    });


  }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.bookViewService.loadBookById(this.bookId);
  }

  openEditModal(): void {
    const currentBook = this.book();
    if (currentBook) {
      this.bookToEdit = this.convertBookToDTO(currentBook);
      this.isEditing = true;
    }
  }

  closeEditModal(): void {
    this.isEditing = false;
    this.bookToEdit = undefined;
    // Reload the book to get the updated data
    this.bookViewService.loadBookById(this.bookId);
  }

  onCloseBookForm() {
    this.isEditing = false;
    this.bookToEdit = undefined;
  }

  /**
   * Convert Book entity to BookFormDTO for editing
   */
  private convertBookToDTO(book: Book): BookFormDTO {
    return {
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      price: book.price,
      pages: book.pages,
      nuart: book.nuart,
      releaseDate: book.releaseDate,
      summary: book.summary,
      hook: book.hook,
      marketing: book.marketing,
      note: book.note,
      coverFile: null,
      authors: book.authors || [],
      bookSteps: book.bookSteps?.map(step => ({
        id: step.id,
        productionStep: step.productionStep,
        status: step.status,
        endDate: step.endDate
      })) || []
    };

  }
}
