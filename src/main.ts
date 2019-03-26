import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import * as Sentry from "@sentry/browser";
import { ppPigpenVersion } from "src/environments/version";

Sentry.init({
  dsn: "https://70a6754621d847338ae94eb0ed2868c9@sentry.io/1422082",
  release: ppPigpenVersion.commit,
});

try {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(error => Sentry.captureException(error ? error.originalError || error : "Null Error in main.ts -> bootstrapModule"));
} catch (error) {
  Sentry.captureException(error ? error.originalError || error : "Null Error in main.ts");
}
