import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation} from '@angular/core';
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
  carousels = computed(() => {
    console.log("computed carousels")
    const booksMap = this.bookService.booksGrouped();
    return Array.from(booksMap.entries()).map(([letter, books]) => ({
      letter,
      books
    }));
  });
  isCreating: boolean = false;

  constructor() {
  }

  ngOnInit() {

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
