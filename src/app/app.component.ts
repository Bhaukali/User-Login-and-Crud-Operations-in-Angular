/* The app component is the root component of the application, it defines the root tag 
   of the app as <app-root></app-root> with the selector property of the @Component decorator. */

/* It subscribes to the currentUser observable in the authentication service so it can reactively 
   show/hide the main navigation bar when the user logs in/out of the application. */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

// Called from the logout link in the main nav bar above to log the user out and redirect them to the login page
  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}

