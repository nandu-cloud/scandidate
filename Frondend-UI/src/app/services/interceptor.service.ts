import { Injectable ,InjectionToken} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    constructor(private lservice:LoginService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = window.sessionStorage.getItem('token');
        const userToken = token;
        const modifiedReq = req.clone({ 
          headers: req.headers.set('Authorization', `Bearer ${userToken}`),
        });
        return next.handle(modifiedReq);
      }
      
}
