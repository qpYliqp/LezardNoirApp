import {Component, effect, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookViewService} from './service/book-view.service';
import {Location} from '@angular/common';
import {ToastService} from '../../shared/services/ToastService/toast.service';
import {Dialog} from 'primeng/dialog';
import {FormCreateBook} from '../../shared/component/forms/form-create-book/form-create-book.component';
import {BookCreationDTO} from '../../shared/component/forms/form-create-book/model/BookCreationDTO';
import {Book} from '../../shared/models/Book';
import {ButtonDirective} from 'primeng/button';
import {TitlesOverviewService} from '../titles-overview/service/titles-overview.service';

@Component({
  selector: 'app-book-view',
  imports: [Dialog, FormCreateBook, ButtonDirective],
  providers: [BookViewService, TitlesOverviewService],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css'
})

export class BookView {
  route = inject(ActivatedRoute);
  router = inject(Router)
  bookViewService = inject(BookViewService);
  location = inject(Location);
  toastService = inject(ToastService);
  bookId: string = "";

  showEditModal: boolean = false;
  bookToEdit?: BookCreationDTO;

  book = this.bookViewService.book;

  constructor() {
    effect(() => {
      if (this.bookViewService.error()) {
        this.toastService.showError("Livre non trouvé", "L'id " + this.bookId + " n'existe pas");
        this.router.navigate(['/board']);
      }
    });

    effect(() => {
      console.log(this.book())
    });
  }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.bookViewService.loadBookById(this.bookId);
  }

  openEditModal(): void {
    const currentBook = this.book();
    console.log('openEditModal - current book:', currentBook);
    if (currentBook) {
      this.bookToEdit = this.convertBookToDTO(currentBook);
      console.log('openEditModal - bookToEdit after conversion:', this.bookToEdit);
      this.showEditModal = true;
    }
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.bookToEdit = undefined;
    // Reload the book to get the updated data
    this.bookViewService.loadBookById(this.bookId);
  }

  /**
   * Convert Book entity to BookCreationDTO for editing
   */
  private convertBookToDTO(book: Book): BookCreationDTO {
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
      date: book.releaseDate,
      authors: book.authors || [],
      bookSteps: book.bookSteps?.map(step => ({
        productionStep: step.productionStep,
        status: step.status,
        endDate: step.endDate
      })) || []
    };
    
  }
}
