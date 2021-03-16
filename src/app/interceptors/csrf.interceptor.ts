import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor(private cs: CookieService,
              private auth: AuthService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    httpRequest = httpRequest.clone({
      headers: httpRequest.headers.set('X-XSRF-TOKEN', this.cs.get('XSRF-TOKEN'))
    });

    return next.handle(httpRequest);
  }
}
