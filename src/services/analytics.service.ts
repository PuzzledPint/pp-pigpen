import { Injectable, isDevMode, PLATFORM_ID, Inject } from "@angular/core";
import { ppPigpenVersion } from "src/environments/version";
import { SentryService } from "./sentry.service";
import { isPlatformBrowser } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import { ReplaySubject } from "rxjs";

interface AnalyticsWindow extends Window {
  ga: any;
}
declare const window: AnalyticsWindow;

// https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
enum GACommands {
  Create = 'create', // ga('create', [trackingId], [cookieDomain], [name], [fieldsObject]);
  Send = 'send', // ga('[trackerName.]send', [hitType], [...fields], [fieldsObject]);
  Set = 'set', // ga('[trackerName.]set', fieldName, fieldValue); OR ga('[trackerName.]set', fieldsObject);
  Require = 'require', //ga('[trackerName.]require', pluginName, [pluginOptions]);
  Provide = 'provide', // ga('provide', pluginName, pluginConstuctor);
  Remove = 'remove', // ga('[trackerName.]remove');
 }

interface GACommand {
  command: GACommands;
  args: string[];
}

@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  private readonly queue = new ReplaySubject<GACommand>(10);

  constructor(private ss: SentryService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
        this.init();
    }
  }

  private init() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.google-analytics.com/analytics.js";

    this.ss.breadcrumb("AnalyticsService", "Loading Analytics");
    script.onload = () => {
      if (!window.ga) {
        this.ss.log("GA was null", true);
      } else {
        this.queue.subscribe(
          gaitem => {
            window.ga(gaitem.command, ...gaitem.args);
          }
        );
        this.ss.breadcrumb("AnalyticsService", "Analytics Loaded");
      }
    };
    script.onerror = (error: any) => this.ss.handleError;
    document.head.appendChild(script);

    //window.ga['l'] = +new Date;

  }

  private ga(command: GACommands, ...args: string[]) {
    this.queue.next({ command, args });
  }

  public appStart() {
    this.ga(GACommands.Create, "UA-137717429-1", 'auto');

    this.ga(GACommands.Set, 'page', this.router.url);
    this.ga(GACommands.Send, 'pageview');

    // subscribe to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ga(GACommands.Set, 'page', event.urlAfterRedirects);
        this.ga(GACommands.Send, 'pageview');
      }
    });
  }
}




