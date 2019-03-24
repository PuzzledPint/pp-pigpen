import * as Sentry from "@sentry/browser";
import { Injectable, ErrorHandler, NgModule, isDevMode } from "@angular/core";
import { NotifyService } from "./notify.service";
import { ppPigpenVersion } from 'src/environments/version';

Sentry.init({
  dsn: "https://70a6754621d847338ae94eb0ed2868c9@sentry.io/1422082",
  release: "pp-pigpen:" + ppPigpenVersion.build,
});

@Injectable()
export class SentryService implements ErrorHandler {
  constructor() {}

  public handleError(error: any) {

    if (isDevMode() && NotifyService.singleton) {
      NotifyService.singleton.stickyAlert("Uncaught Exception", error);
    } else {
      Sentry.captureException(error.originalError || error);
    }
    console.error(error);
  }

  public setUser(id: string, name: string, email: string, gcCity?: string) {
    Sentry.addBreadcrumb({
      category: 'auth',
      message: 'Logged In',
      level: Sentry.Severity.Info
    });
    Sentry.configureScope((scope) => {
      scope.setUser({
        "id": id,
        "username": name,
        "email": email,
        "gcCity" : gcCity ? gcCity : "none"
      });
    });
  }

  public testError(): any {
    Sentry.captureException(new Error("This is a test Error Message"));
  }
}
