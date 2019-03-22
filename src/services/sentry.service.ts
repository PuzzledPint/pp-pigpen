import * as Sentry from "@sentry/browser";
import { Injectable, ErrorHandler, NgModule, isDevMode } from "@angular/core";
import { NotifyService } from "./notify.service";
import { ppPigpenVersion } from 'src/environments/version';

Sentry.init({
  dsn: "https://70a6754621d847338ae94eb0ed2868c9@sentry.io/1422082",
  release: "pp-pigpen:" + ppPigpenVersion.build,
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  public handleError(error: any) {
    Sentry.captureException(error.originalError || error);

    if (isDevMode() && NotifyService.singleton) {
      NotifyService.singleton.stickyAlert("Uncaught Exception", error);
    }

    console.error(error);
  }
}
