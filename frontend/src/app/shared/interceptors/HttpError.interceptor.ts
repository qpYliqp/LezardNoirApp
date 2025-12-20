// error.interceptor.ts
import {inject} from '@angular/core';
import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {ToastService} from '../services/ToastService/toast.service';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      toastService.showError("Erreur", error.message || "Une erreur est survenue");
      return throwError(() => error);
    })
  );
};
