import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from './component/sidebar/sidebar';
import {Toast} from 'primeng/toast';
import {ToastService} from './services/toast-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  toastService = inject(ToastService);

  protected readonly title = signal('frontend');

  ngOnInit() {
    this.toastService.showSuccess("oui", "tg")
  }
}
