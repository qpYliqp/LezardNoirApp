import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
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

import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged} from 'rxjs';

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

  isFilterMode = signal<boolean>(false);

  carousels = computed(() => {
    const booksMap = this.bookService.booksGrouped();
    return Array.from(booksMap.entries()).map(([letter, books]) => ({
      letter,
      books,
    }));
  });

  filteredBooks = this.bookService.allBooks;
  isCreating: boolean = false;

  filters: BookFilter = {
    prefix: null,
  };

  searchValue: string = '';

  private readonly destroyRef = inject(DestroyRef);
  private readonly searchTerm = signal<string>('');

  constructor() {
    this.bookService.loadAllBooks();

    toObservable(this.searchTerm)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        const v = (value ?? '').trim();
        this.isFilterMode.set(!!v);
        this.filters.prefix = v.length ? v : null;
        this.bookService.loadAllBooks(this.filters);
      });
  }


  onSearching(value: string) {
    this.searchValue = value ?? '';
    this.searchTerm.set(this.searchValue);
    if (this.searchValue === '') {
      this.isFilterMode.set(false);
      this.filters.prefix = null;
      this.bookService.loadAllBooks();
    }
  }

  ngOnInit() {
  }

  filter() {
    const v = (this.searchValue ?? '').trim();
    this.isFilterMode.set(!!v);
    this.filters.prefix = v.length ? v : null;
    this.bookService.loadAllBooks(this.filters);
  }

  resetFilters() {
    this.filters = {
      prefix: null,
    };
    this.searchValue = '';
    this.isFilterMode.set(false);
    this.searchTerm.set(''); // remet aussi le signal interne à zéro
    this.bookService.loadAllBooks(); // recharge sans filtre
  }

  openBookForm() {
    this.isCreating = true;
  }

  onCloseBookForm() {
    this.isCreating = false;
  }

}
