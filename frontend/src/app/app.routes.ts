import { Routes } from '@angular/router';
import {Board} from './views/board/component/board';
import {Calendar} from './views/calendar/component/calendar';
import {TitlesOverview} from './views/titles-overview/component/titles-overview';

export const routes: Routes = [
  {path: "board", component: Board},
  {path: "calendar", component: Calendar},
  {path: "titles", component: TitlesOverview}
];
