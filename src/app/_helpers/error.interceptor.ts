/* The Error Interceptor intercepts http responses from the api to check if there were any errors. 
   If there is an Unauthorized response from the api then the user is automatically logged out of the application, 
   all other errors are re-thrown up to the calling service so an alert can be displayed to the user.*/

// Http interceptors are added to the request pipeline in the providers section of the app.module.ts file

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable()

 /* Implementing By extending the HttpInterceptor class to create a custom interceptor 
    to catch all error responses from the server in a single location. */

export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}