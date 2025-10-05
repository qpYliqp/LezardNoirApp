import {Component, CUSTOM_ELEMENTS_SCHEMA, input} from '@angular/core';
import {Book} from '../../models/Book';
import {Navigation} from 'swiper/modules';
import {LittleBookCard} from '../cards/little-book-card/little-book-card';

@Component({
  selector: 'app-swiper',
  imports: [
    LittleBookCard
  ],
  templateUrl: './swiper.html',
  styleUrl: './swiper.css',
  //Dans mes templates, il est possible que j’utilise des éléments HTML personnalisés que Angular ne connaît pas encore. Ne me génère pas d’erreur pour ça.
  //Utile pour les Web Components
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Swiper {


  books = input<Book[]>([]);
  id = input<string>("");


  private swiperInstance: any = null;

  ngOnInit() {
    setTimeout(() => {
      this.initializeSwiper();
    });
  }


  private initializeSwiper() {

    const swiperEl = document.querySelector(`#swiper-${this.id()}`) as any;
    if (!swiperEl) return;


    const nextBtn = document.querySelector(
      `.swiper-button-next-${this.id()}`
    );
    const prevBtn = document.querySelector(
      `.swiper-button-prev-${this.id()}`
    );


    const swiperParams = {
      modules: [Navigation],
      navigation: {nextEl: nextBtn, prevEl: prevBtn},
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();

  }


}
