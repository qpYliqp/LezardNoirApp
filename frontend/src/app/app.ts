import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Sidebar} from './component/sidebar/sidebar';
import {provideStore} from '@ngxs/store';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
