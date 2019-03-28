import * as Sentry from "@sentry/browser";
import { Injectable, ErrorHandler, isDevMode } from "@angular/core";
import { NotifyService } from "./notify.service";
import { ppPigpenVersion } from "src/environments/version";
// See main.ts for Sentry init

@Injectable({
  providedIn: "root",
})
export class SentryService implements ErrorHandler {
  private user = { name: "", email: "" };

  constructor() {}

  public handleError(error: any) {
    if (isDevMode() && NotifyService.singleton) {
      NotifyService.singleton.stickyError("Uncaught Exception", error);
    } else {
      Sentry.captureException(error.originalError || error);
    }
    console.error(error);
  }

  public setUser(id: string, name: string, email: string, gcCity?: string) {
    this.user.name = name;
    this.user.email = email;

    Sentry.addBreadcrumb({
      category: "auth",
      message: "Logged In",
      level: Sentry.Severity.Info,
    });
    Sentry.configureScope(scope => {
      scope.setUser({
        id: id,
        username: name,
        email: email,
        gcCity: gcCity ? gcCity : "none",
      });
    });
  }

  public log(msg: string, logToSentry = false): any {
    if (isDevMode()) {
      NotifyService.singleton.stickyError("LOG", msg);
      console.log(msg);
    }
    if(logToSentry) {
      Sentry.captureMessage(msg, Sentry.Severity.Log);
    }
  }

  public errorReport() {
    Sentry.captureMessage("FooterClick", Sentry.Severity.Critical);
    Sentry.showReportDialog({
      user: this.user,
      title: "We're sorry you're experiencing an issue",
      subtitle: "We will look into the problem and get back to you.",
      subtitle2: "Please tell us what's happening",
      labelSubmit: "Submit",
    });
  }

  public breadcrumb(b: string) {
    Sentry.captureMessage(b, Sentry.Severity.Debug);
  }
}
