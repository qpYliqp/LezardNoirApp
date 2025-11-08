import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal, ViewEncapsulation} from '@angular/core';
import {TitlesOverviewService} from '../service/titles-overview.service';
import {CarouselModule} from 'primeng/carousel';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {BookFilter} from '../BookFilter';
import {LittleBookCard} from '../../../shared/component/cards/little-book-card/little-book-card.component';
import {FormCreateBook} from '../../../shared/component/forms/form-create-book/form-create-book.component';
import {Swiper} from '../../../shared/component/swiper/swiper.component';

@Component({
  selector: 'app-titles-overview',
  imports: [
    CarouselModule,
    FormCreateBook,
    FormsModule,
    InputText,
    IconField,
    InputIcon,
    LittleBookCard,
    Swiper,

  ],
  providers: [TitlesOverviewService],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './titles-overview.component.html',
  styleUrl: './titles-overview.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TitlesOverview {

  bookService = inject(TitlesOverviewService);

  // Signal pour savoir si on est en mode recherche/filtrage
  isFilterMode = signal<boolean>(false);

  carousels = computed(() => {
    const booksMap = this.bookService.booksGrouped();
    return Array.from(booksMap.entries()).map(([letter, books]) => ({
      letter,
      books
    }));
  });

  filteredBooks = this.bookService.allBooks;
  isCreating: boolean = false;

  filters: BookFilter = {
    startWithPrefix: null,
  }

  searchValue: string = '';

  constructor() {
  }

  onSearching(value: string) {
    this.searchValue = value;

    if (value === '') {
      this.isFilterMode.set(false);
      this.filters.startWithPrefix = null;
    } else {
      this.isFilterMode.set(true);
      this.filters.startWithPrefix = value;
      this.bookService.loadAllBooks(this.filters);
    }
  }

  ngOnInit() {
  }

  filter() {
    this.isFilterMode.set(true);
    this.bookService.loadAllBooks(this.filters);
  }

  resetFilters() {
    this.filters = {
      startWithPrefix: null,
    };
    this.searchValue = '';
    this.isFilterMode.set(false);
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
