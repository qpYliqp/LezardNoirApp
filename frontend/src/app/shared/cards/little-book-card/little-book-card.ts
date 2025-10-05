import {Component, inject, input} from '@angular/core';
import {Book} from '../../../models/Book';
import {Tooltip} from 'primeng/tooltip';
import {Router} from '@angular/router';

@Component({
  selector: 'app-little-book-card',
  imports: [
    Tooltip
  ],
  templateUrl: './little-book-card.html',
  styleUrl: './little-book-card.css'
})
export class LittleBookCard {

  book = input.required<Book>();
  router = inject(Router);

  goToBookDetail() {
    console.log("test");
    this.router.navigate(['/book', this.book().id]);
  };


}
