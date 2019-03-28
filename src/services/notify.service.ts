import { Injectable, ErrorHandler, isDevMode } from "@angular/core";
import { MessageService } from "primeng/api";
import { Title } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotifyService {
  public static singleton: NotifyService;
  public title: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(
    private messageService: MessageService,
    private titleService: Title
  ) {
    NotifyService.singleton = this;
  }

  public error(title: string, desc: string, sticky=false) {
    this.messageService.add({
      severity: "error",
      summary: title,
      detail: desc,
      sticky: sticky
    });
  }

  public stickyError(title: string, desc: string) {
    this.error(title, desc, true);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle("Puzzled Pint " + newTitle);
    this.title.next(newTitle);
  }
}
