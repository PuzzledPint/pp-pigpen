import { Injectable, ErrorHandler, isDevMode } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Title } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  static singleton: NotifyService;
  public title: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private messageService: MessageService, private titleService: Title) {
    NotifyService.singleton = this;
   }

  error(title: string, desc: string) {
    this.messageService.add({severity: 'error', summary: title, detail: desc});
}

stickyAlert(title: string, desc: string) {
  this.messageService.add({severity: 'error', summary: title, detail: desc, sticky: true});
}

  setTitle(newTitle: string) {
    this.titleService.setTitle("Puzzled Pint " + newTitle);
    this.title.next(newTitle);
  }
}

export class AppErrorHandler implements ErrorHandler {
  handleError(error: string) {
    if (isDevMode() && NotifyService.singleton) {
      NotifyService.singleton.stickyAlert("Uncaught Exception", error);
    } else {
      console.error(error);
    }
  }
}
