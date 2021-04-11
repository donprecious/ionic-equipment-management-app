import { AuthService } from './../../service/auth.service';
import { RegisterRequestModel } from './../../model/auth/register-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  error = ''
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
      
          let reqisterModel =   {} as RegisterRequestModel;
          reqisterModel.email = profile.email;
          reqisterModel.firstName = profile.given_name;
          reqisterModel.lastName = profile.family_name;
          reqisterModel.password = "1A1" + profile.email;
          this.authService.register(reqisterModel).subscribe(a => {
            console.log("result", a)
            localStorage.setItem("userId", a.data.id);
            this.router.navigate(['/dashboard']);
          }, err => {
            console.log(err);
             this.error =   err.error.message
          });
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
