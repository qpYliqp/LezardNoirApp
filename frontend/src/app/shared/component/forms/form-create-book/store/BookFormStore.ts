import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {BookCreationDTO} from '../model/BookCreationDTO';
import {inject, Injectable} from '@angular/core';
import {tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {BookFactory} from '../factories/book.factory';

export class UpdateBook {
  static readonly type = '[BookCreationForm] Update Book';

  constructor(public updates: Partial<BookCreationDTO>) {
  }
}

export class ResetBook {
  static readonly type = '[BookCreationForm] Reset Book';
}

export interface CreateBookState {
  book: BookCreationDTO;
}

const initialState: CreateBookState = {
  book: BookFactory.createEmptyBook(),
};

@Injectable()
@State<CreateBookState>({
  name: 'BookCreationForm',
  defaults: initialState
})
export class BookFormState {

  @Selector()
  static book(state: CreateBookState): BookCreationDTO {
    if (!state || !state.book) {
      return BookFactory.createEmptyBook();
    }
    return state.book;
  }

  @Action(UpdateBook)
  updateBook(ctx: StateContext<CreateBookState>, action: UpdateBook) {
    const currentBook = ctx.getState().book;
    console.log("Updating book with:", action.updates);
    ctx.patchState({
      book: {
        ...currentBook,
        ...action.updates
      }
    });
  }

  @Action(ResetBook)
  resetBook(ctx: StateContext<CreateBookState>) {
    ctx.setState({
      book: BookFactory.createEmptyBook()
    });
  }
}

@Injectable()
export class BookFormStore {
  store = inject(Store);

  readonly book = toSignal(
    this.store.select(BookFormState.book).pipe(
      tap(b => console.log("Book state changed:", b))
    ),
    {initialValue: BookFactory.createEmptyBook()}
  );

  updateBook(updates: Partial<BookCreationDTO>) {
    this.store.dispatch(new UpdateBook(updates));
  }

  resetBook() {
    this.store.dispatch(new ResetBook());
  }
}
