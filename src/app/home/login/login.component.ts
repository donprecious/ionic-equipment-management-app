import { UserServiceService } from './../../service/users/user-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserServiceService) {}
  error = '';
  ngOnInit() {
    
  }

  start() {
   const  provider = new firebase.default.auth.GoogleAuthProvider();
      firebase.default.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // // The signed-in user info.
        // var user = result.user;
        console.log('login auth result', result);
             const profile = result.additionalUserInfo.profile as any;
          //attempt to login  
          this.userService.getUserByEmail(profile.email).subscribe(a => {
            localStorage.setItem("userId", a.data.id);
            this.router.navigate(['/dashboard']);
          }, err => {
            console.log(err);
             this.error =   err.error.message
          })
          this.router.navigate(['/dashboard']);
          return false;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  
}
