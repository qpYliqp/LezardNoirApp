import { Routes } from '@angular/router';
import {Board} from './component/board/board';
import {Calendar} from './component/calendar/calendar';

export const routes: Routes = [
  {path: "board", component: Board},
  {path: "calendar", component: Calendar}
];
