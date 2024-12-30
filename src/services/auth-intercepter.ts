import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LocalStorageService } from './localStorage-service';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
    constructor(private localStorage: LocalStorageService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.localStorage.getItem("token");
        
        if (authToken == null) {
            if (req.url.includes('api/base')) {
                this.router.navigate(['/login']);
                return throwError(() => new Error('Unauthorized'));
            }
            return next.handle(req);
        }
        if (!req.url.includes('api/base')) {
            return next.handle(req);
          }
        
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            }
        });
        console.log(authToken);
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.localStorage.removeItem('token');
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}