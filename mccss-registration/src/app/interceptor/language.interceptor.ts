import { Injectable } from "@angular/core"

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentLang = sessionStorage.getItem('locale') || 'en';
    const modifiedReq = req.clone({
      headers: req.headers.set('Accept-Language', currentLang),
    });
    return next.handle(modifiedReq);
  }
}
