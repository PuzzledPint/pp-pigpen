import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private messageService: MessageService) { }

  error(title: string, desc: string) {
      this.messageService.add({severity: 'error', summary: title, detail: desc});
  }
}
