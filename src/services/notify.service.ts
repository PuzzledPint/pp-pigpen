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

  public error(title: string, desc: string) {
    this.messageService.add({
      severity: "error",
      summary: title,
      detail: desc
    });
  }

  public stickyAlert(title: string, desc: string) {
    this.messageService.add({
      severity: "error",
      summary: title,
      detail: desc,
      sticky: true
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle("Puzzled Pint " + newTitle);
    this.title.next(newTitle);
  }
}
