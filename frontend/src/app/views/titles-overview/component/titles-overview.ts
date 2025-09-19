import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  AfterViewInit, HostListener
} from '@angular/core';
import {Book} from '../../../models/Book';
import {TitlesOverviewService} from '../service/titles-overview-service';
import {AsyncPipe} from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {Card} from 'primeng/card';
// import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import {Swiper} from '../../../shared/swiper/swiper';

@Component({
  selector: 'app-titles-overview',
  imports: [
    CarouselModule,
    Card,
    Swiper,
  ],
  providers: [TitlesOverviewService],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './titles-overview.html',
  styleUrl: './titles-overview.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TitlesOverview {

  bookService = inject(TitlesOverviewService);
  carousels: { letter: string; books: Book[]; showNavigation?: boolean, activeIndex? : number }[] = [];
  private swiperInstances: Map<string, any> = new Map();
  currentSlidesPerView = 2;

  breakpointsConfig = [
    { width: 0, slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 10 },
    { width: 480, slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 15 },
    { width: 768, slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 15 },
    { width: 1024, slidesPerView: 6, slidesPerGroup: 1, spaceBetween: 20 },
    { width: 1280, slidesPerView: 9, slidesPerGroup: 1, spaceBetween: 20 },
  ];


  constructor() {}

  // Méthode corrigée qui retourne une chaîne JSON
  getNavigationConfigString(letter: string): string {
    return JSON.stringify({
      nextEl: `.swiper-button-next-${letter}`,
      prevEl: `.swiper-button-prev-${letter}`
    });
  }

  // Gardez aussi l'ancienne méthode si nécessaire pour d'autres usages
  getNavigationConfig(letter: string) {
    return {
      nextEl: `.swiper-button-next-${letter}`,
      prevEl: `.swiper-button-prev-${letter}`
    };
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



}
