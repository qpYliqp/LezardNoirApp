import {Component, effect, inject, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MultiSelect} from 'primeng/multiselect';
import {AuthorService} from '../../../../services/AuthorService/author.service';
import {IBookAuthorsForm} from './model/BookAuthorsFormDTO';
import {Author} from '../../../../models/Author';
import {BookFormFacadeService} from '../service/book-form-facade.service';

@Component({
  selector: 'app-form-book-authors',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MultiSelect
  ],
  providers: [AuthorService],
  templateUrl: './form-book-authors.component.html',
  styleUrl: './form-book-authors.component.css'
})
export class FormBookAuthors {

  authorService = inject(AuthorService);
  readonly facade = inject(BookFormFacadeService);
  allAuthors: Author[] = [];
  bookAuthors: IBookAuthorsForm = {
    authors: []
  };
  hasSubmited: boolean = false;


  @ViewChild('formBookAuthors') formBookAuthors?: NgForm;

  constructor() {
    effect(() => {
      const book = this.facade.book();
      this.bookAuthors = {
        authors: book.authors
      };
    });
  }

  ngOnInit() {
    this.loadAllAuthors();
  }


  public onSubmit(): boolean {
    this.hasSubmited = true;
    if (this.formBookAuthors && this.formBookAuthors.valid) {
      this.hasSubmited = false;
      this.facade.updateBook(this.bookAuthors);
      console.log(this.facade.book())
      return true;
    }
    console.log("zebizob")
    return false;
  }

  removeAuthor(author: Author) {
    this.bookAuthors.authors = this.bookAuthors!.authors!.filter(a => a.id !== author.id)
  }


  loadAllAuthors() {
    this.authorService.getAllAuthors().subscribe({
      next: (data) => {
        this.allAuthors = data;
        console.log('Liste des auteurs :', this.allAuthors);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des auteurs', err);
      }
    });
  }
}
