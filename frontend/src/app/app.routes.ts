import {Routes} from '@angular/router';
import {Board} from './features/board/component/board.component';
import {BookView} from './features/book-view/book-view.component';
import {Calendar} from './features/calendar/component/calendar.component';
import {TitlesOverview} from './features/titles-overview/component/titles-overview.component';


export const routes: Routes = [
  {path: "board", component: Board},
  {path: "calendar", component: Calendar},
  {path: "titles", component: TitlesOverview},
  {path: 'book/:id', component: BookView}
];
