import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {ToastService} from './shared/services/ToastService/toast.service';
import {Sidebar} from './shared/component/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  toastService = inject(ToastService);

  protected readonly title = signal('frontend');

  ngOnInit() {
    this.toastService.showSuccess("oui", "tg")
  }
}
