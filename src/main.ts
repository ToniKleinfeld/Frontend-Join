import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  registerLocaleData(localeEn, 'en', localeEnExtra);
