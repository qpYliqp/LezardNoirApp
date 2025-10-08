import {inject, Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  messageService = inject(MessageService)

  showSuccess(summary: string, detail: string, life = 3000) {
    this.messageService.add({severity: 'success', summary, detail, life});
  }

  showError(summary: string, detail: string, life = 3000) {
    this.messageService.add({severity: 'error', summary, detail, life});
  }

  showInfo(summary: string, detail: string, life = 3000) {
    this.messageService.add({severity: 'info', summary, detail, life});
  }

  showWarn(summary: string, detail: string, life = 3000) {
    this.messageService.add({severity: 'warn', summary, detail, life});
  }

}
