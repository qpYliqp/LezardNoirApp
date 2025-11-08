import {Component, effect, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookViewService} from './service/book-view.service';
import {Location} from '@angular/common';
import {ToastService} from '../../shared/services/ToastService/toast.service';

@Component({
  selector: 'app-book-view',
  imports: [],
  providers: [BookViewService],
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
}
