import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

export interface IPreloadScriptResult { script: string; loaded: boolean; status: string; }

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderResolver implements Resolve<IPreloadScriptResult[]> {
  // Here import all dynamically js file
  private scripts: any = {
    stripe: { loaded: false, src: "https://checkout.stripe.com/checkout.js" },
    quill:  { loaded: false, src: "https://cdn.quilljs.com/1.3.6/quill.min.js", style: "https://cdn.quilljs.com/1.3.6/quill.snow.css" },
  };

  constructor() { }
  public load(...scripts: string[]) {
    const promises = scripts.map(script => this.loadScript(script));
    return Promise.all(promises);
  }
  public loadScript(name: string): Promise<IPreloadScriptResult> {
    return new Promise((resolve, reject) => {
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {

        if (this.scripts[name].style) {
          const styleElement = document.createElement('link');
          styleElement.href = this.scripts[name].style;
          document.head.appendChild(styleElement);
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) => reject({ script: name, loaded: false, status: 'Loaded Error:' + error.toString() });
        document.head.appendChild(script);
      }
    });
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IPreloadScriptResult[]> {
    if (route && route.routeConfig && route.routeConfig.data) {
      return this.load(...route.routeConfig.data.preloadScripts);
    } else {
      throw new Error("invalid route parameter in ScriptLoaderResolver");
    }
  }
}
