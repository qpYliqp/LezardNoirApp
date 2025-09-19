import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, input, ViewChild} from '@angular/core';
import {Input} from 'postcss';
import {Book} from '../../models/Book';
import {Card} from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';
import {Navigation} from 'swiper/modules';

@Component({
  selector: 'app-swiper',
  imports: [
    Card,
    PrimeTemplate
  ],
  templateUrl: './swiper.html',
  styleUrl: './swiper.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Swiper {


  books = input<Book[]>([]);
  id = input<string>("");

  currentSlidesPerView = 2;
  showNavigation = false;
  activeIndex = 0;

  breakpointsConfig = [
    { width: 0, slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 10 },
    { width: 480, slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 15 },
    { width: 768, slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 15 },
    { width: 1024, slidesPerView: 6, slidesPerGroup: 1, spaceBetween: 20 },
    { width: 1280, slidesPerView: 9, slidesPerGroup: 1, spaceBetween: 20 },
  ];

  private swiperInstance: any = null;

  ngOnInit()
  {
    setTimeout(() => {
      this.initializeSwiper();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCurrentSlidesPerView();
  }

  private updateCurrentSlidesPerView() {
    const width = window.innerWidth;
    let spv = 2;
    for (const bp of this.breakpointsConfig) {
      if (width >= bp.width) spv = bp.slidesPerView;
    }
    this.currentSlidesPerView = spv;
    this.showNavigation = this.books().length > this.currentSlidesPerView;
  }

  private initializeSwiper() {
    this.updateCurrentSlidesPerView();

    const swiperEl = document.querySelector(`#swiper-${this.id()}`) as any;
    if (!swiperEl) return;


          const nextBtn = document.querySelector(
            `.swiper-button-next-${this.id()}`
          );
          const prevBtn = document.querySelector(
            `.swiper-button-prev-${this.id()}`
          );

    const breakpointsObj: Record<number, any> = {};
    this.breakpointsConfig.forEach(bp => {
      breakpointsObj[bp.width] = {
        slidesPerView: bp.slidesPerView,
        slidesPerGroup: bp.slidesPerGroup,
        spaceBetween: bp.spaceBetween,
      };
    });

    const swiperParams = {
      modules: [Navigation],
      loop: false,
      navigation: { nextEl: nextBtn, prevEl: prevBtn },
      slidesPerView: 2,
      spaceBetween: 15,
      slidesPerGroup: 1,
      breakpoints: breakpointsObj,
      on: {
        slideChange: (swiper: any) => {
          this.activeIndex = swiper.activeIndex;
        }
      }
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();

    this.swiperInstance = swiperEl.swiper;
    this.activeIndex = this.swiperInstance.activeIndex;
  }
  
}
