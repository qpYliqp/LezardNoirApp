import {Component, inject} from '@angular/core';
import {Book} from '../../models/Book';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-view',
  imports: [],
  templateUrl: './book-view.html',
  styleUrl: './book-view.css'
})
export class BookView {
  book: Book | null = null;

  route = inject(ActivatedRoute);

  ngOnInit() {

    const bookId = this.route.snapshot.paramMap.get('id')!;

  }
}
