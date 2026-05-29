import { ApplicationConfig, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { ThemeService } from './services/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // Hydrate the prerendered DOM and reuse data fetched during prerender
    // (HTTP transfer cache is on by default) — no re-fetch on the client.
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => inject(ThemeService).init()),
  ]
};
