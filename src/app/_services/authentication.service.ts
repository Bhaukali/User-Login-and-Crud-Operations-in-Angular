/* The authentication service is used to login and logout of the application, to login it posts the users 
   credentials to the api and checks the response for a JWT token, if there is one it means authentication 
   was successful so the user details including the token are added to local storage. */

/* There are two properties exposed by the authentication service for accessing the currently logged in user. 
   The currentUser observable can be used when you want a component to reactively update when a user logs in or out, 
   for example in the app.component.ts so it can show/hide the main nav bar when the user logs in/out. */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${config.useDeprecatedSynchronousErrorHandling}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}