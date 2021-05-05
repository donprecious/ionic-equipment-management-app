import { AppConstant } from './../../../shared/constant';
import { AssignRoomRequestModel } from './../../../model/room/room-model';
import { RoomService } from './../../../service/rooms/room.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageServiceService } from 'src/app/service/shared/storage-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { } from 'google.maps';
/// <reference types="google.maps" />
import { } from 'google.maps'
import { Room } from 'src/app/model/room/room-model';
@Component({
  selector: 'app-view-room-info',
  templateUrl: './view-room-info.component.html',
  styleUrls: ['./view-room-info.component.scss'],
})
export class ViewRoomInfoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private geolocation: Geolocation,
    private roomService: RoomService,
    public  alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private strogeService: StorageServiceService
  ) { }
    form : FormGroup
  
    currentPoint = { lat: 0, lng: 0 }
    loading: boolean = false;
   errorMessage = '';
  room: Room;
  distance = 0;
async ngOnInit() {

     this.form = this.fb.group({
        hours: ['', Validators.required]
     });
    
    const id = this.route.snapshot.paramMap.get('id');
    this.loading = true;
      this.roomService.getRoom(id).subscribe(a => {
        this.loading = false;
        this.room = a.data;
      }, err => {
        console.log('retriveal error ', err);
      });
  
   await  this.loadLocation();
      
 const itemLocation = this.getLatLngFromUrl(this.room.mapLocation);
        let userLocation = new google.maps.LatLng({
          lat: Number( this.currentPoint.lat),
          lng: Number( this.currentPoint.lng)
        });
    const distance = this.getDistance(userLocation, itemLocation);
    this.distance = distance;
        console.log("distance", distance);
}
  
    async loadLocation() {
    const resp = await this.geolocation.getCurrentPosition();
       console.log("geo location",resp)
     const lat = resp.coords.latitude;
      const lng = resp.coords.longitude;
      this.currentPoint.lat = lat;
      this.currentPoint.lng = lng;
      this.initMap(lat, lng)
   
      
    
  }
   initMap(lat, lng) {
     let map: google.maps.Map;
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: lat, lng: lng },
        zoom: 8,
      });
     const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
    });
    
   }
   async submit() {
  
    if (this.currentPoint.lat == 0 && this.currentPoint.lng == 0) {
      this.errorMessage = 'location not found, ensure to turn on internet and enable location'
      return;
    }
    if (this.form.invalid) {
      this.errorMessage = 'please fill all required information '
      return;
    }
      if (this.distance > AppConstant.minDistanceInKm) {
      this.errorMessage = 'Sorry you are too far , from the building'
      return;
    }
     
    const hours = this.form.get('hours').value; 
    const userId =Number(  await this.strogeService.getItem('userId'));
    
      let model = {
        roomId: this.room.id,
        userId: userId,
        userLocation: JSON.stringify(this.currentPoint),
        allocatedHoursToUse: hours
      } as AssignRoomRequestModel;
    
    this.roomService.AssignUser(model).subscribe(a => {
        console.log("result", a)
        this.alert("success, room assigned successfully");
        this.dismiss();
    }, error => {
      this.errorMessage = error.error.data;
        console.log("errror", error)
      });
    

   }
    async alert(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Message',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  dismiss() {
    this.router.navigate(['/dashboard/rooms']);
  }
  
  getLatLngFromUrl(mapurl) {
    const regex = new RegExp('@(.*),(.*),');
    const lon_lat_match = mapurl.match(regex);
    const lng = lon_lat_match[1];
    const lat = lon_lat_match[2];
    const point = new google.maps.LatLng({lat: Number (lat), lng: Number(lng)})
    return point;
  }

  getDistance(from: google.maps.LatLng, to: google.maps.LatLng) {
    console.log("from", from.lat(), from.lng());
    console.log("to", to.lat(), to.lng());

    let distance = google.maps.geometry.spherical.computeDistanceBetween(from, to); 
    if (distance) {
      distance  = distance/1000.00
    }
    return distance;
  }


}
