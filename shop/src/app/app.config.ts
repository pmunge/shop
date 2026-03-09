import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient , withInterceptors} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {refreshInterceptor} from './interceptors/refreshinterceptor.interceptor';
import {jwtInterceptor} from './interceptors/jwtinterceptor.interceptor';
import {loadingInterceptor} from './interceptors/httpinterceptor.interceptor'
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptor, refreshInterceptor, loadingInterceptor])
    ),
    provideClientHydration(),
    provideAnimations(),
  ],
};
