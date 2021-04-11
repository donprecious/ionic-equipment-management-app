import { Component } from '@angular/core';
import firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: 'AIzaSyAu1-yp1Al_yD3S3NyVifrVUmFez4Lf3Lk',
      authDomain: 'stackgip-equipment-app.firebaseapp.com',
      databaseURL: 'https://stackgip-equipment-app.firebaseio.com',
      projectId: 'stackgip-equipment-app',
      storageBucket: 'stackgip-equipment-app.appspot.com',
      messagingSenderId: 'SENDER_ID',
      appId: 'APP_ID',
      measurementId: 'G-MEASUREMENT_ID',
    };
    firebase.initializeApp(firebaseConfig);
  }
}
