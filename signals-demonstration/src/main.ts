import { bootstrapApplication, enableDebugTools } from "@angular/platform-browser";
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ApplicationRef } from "@angular/core";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

platformBrowserDynamic().bootstrapModule(AppComponent)
  .then(moduleRef => {
    const applicationRef = moduleRef.injector.get(ApplicationRef);
    const componentRef = applicationRef.components[0];
    enableDebugTools(componentRef);
  })
  .catch(err => console.error(err));
