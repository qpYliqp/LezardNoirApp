import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation} from '@angular/core';
import {Book} from '../../../models/Book';
import {TitlesOverviewService} from '../service/titles-overview-service';
import {CarouselModule} from 'primeng/carousel';
// import Swiper from 'swiper';
import {Swiper} from '../../../shared/swiper/swiper';
import {FormCreateBook} from '../../../shared/forms/form-create-book/form-create-book';

@Component({
  selector: 'app-titles-overview',
  imports: [
    CarouselModule,
    Swiper,
    FormCreateBook,

  ],
  providers: [TitlesOverviewService],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './titles-overview.html',
  styleUrl: './titles-overview.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TitlesOverview {

  bookService = inject(TitlesOverviewService);
  carousels: { letter: string; books: Book[]; showNavigation?: boolean, activeIndex?: number }[] = [];
  isCreatingBook: boolean = false;

  isCreating: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.bookService.getAllBooksGroupedByLetter().subscribe({
      next: (map) => {
        this.carousels = Array.from(map.entries()).map(([letter, books]) => ({
          letter,
          books
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des livres groupés par lettre:', err.message);
      }
    });
  }

  openBookForm() {
    this.isCreating = true;
  }

  onCloseBookForm() {
    this.isCreating = false;
  }

  public createBook() {
    console.log("hehe")
  }


}
