import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';

import Theme from '@primeuix/themes/nora';


import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {providePrimeNG} from 'primeng/config';
import {provideStore} from '@ngxs/store';
import {MessageService} from 'primeng/api';
import {ToastService} from './shared/services/ToastService/toast.service';
import {HttpErrorInterceptor} from './shared/interceptors/HttpError.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([HttpErrorInterceptor])
    ),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Theme,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          }
        }
      }
    }),
    provideStore(),
    MessageService,
    ToastService

  ]
};
