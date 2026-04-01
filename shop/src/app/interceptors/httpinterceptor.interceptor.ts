import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading-service.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(LoadingService);

  const url = req.url;
  const shouldShowLoader =
    req.method === 'POST' && (
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/admins/register') ||
      url.includes('/product/product')
    );

  if (shouldShowLoader) {
    loadingService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (shouldShowLoader) {
        loadingService.hide();
      }
    })
  );
};
