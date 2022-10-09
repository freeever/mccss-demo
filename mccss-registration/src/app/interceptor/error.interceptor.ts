import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
      request: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
      return next.handle(request)
          .pipe(
              retry(1),
              catchError((error: HttpErrorResponse) => {
                  let errMsg = '';
                  if (error.error instanceof ErrorEvent) {
                      // client-side error
                      errMsg = `Error: ${error.error}`;
                  } else {
                      // server-side error
                      errMsg = `Error Status: ${error.status}\nMessage: ${error.error.message}`;
                  }

                  console.error(errMsg);
                  return throwError(() => error.error);
              })
          )
  }
}
