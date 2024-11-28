// src/app/interceptors/loader.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: NgxUiLoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.start(); // Start the loader before the request is sent

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.loaderService.stop(); // Stop the loader after a successful response
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.stop(); // Stop the loader on error
        throw error; // Re-throw the error to be handled elsewhere
      })
    );
  }
}
