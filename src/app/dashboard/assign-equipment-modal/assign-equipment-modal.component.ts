import { AppConstant } from './../../shared/constant';
import { StorageServiceService } from './../../service/shared/storage-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentsService } from './../../service/equipments/equipments.service';
import { AllocateEquipmentModel } from './../../model/equipments/equipments-model';
/// <reference types="google.maps" />
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Equipment, EquipmentsUsage } from 'src/app/model/equipments/equipments-usage-model';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { } from 'google.maps'

@Component({
  selector: 'app-assign-equipment-modal',
  templateUrl: './assign-equipment-modal.component.html',
  styleUrls: ['./assign-equipment-modal.component.scss'],
})
export class AssignEquipmentModalComponent implements OnInit {

  equipmentsUsage: EquipmentsUsage;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    private geolocation: Geolocation,
    private equipmentService: EquipmentsService,
    public  alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private strogeService: StorageServiceService
  ) {
    
  }

    form : FormGroup
  
    currentPoint = { lat: 0, lng: 0 }
    loading: boolean = false;
    errorMessage = '';
 
  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  };
  distance = 0.0;
  async ngOnInit() {
     
     this.form = this.fb.group({
        hours: ['', Validators.required]
     });
    
    const id = this.route.snapshot.paramMap.get('id');
    this.loading = true;
      this.equipmentService.get(id).subscribe(a => {
        this.loading = false;
        this.equipmentsUsage = a.data;
      

      }, err => {
        console.log('retriveal error ', err);
      });
  await  this.loadLocation();
  const itemLocation = this.getLatLngFromUrl(this.equipmentsUsage.equipment.positionInMap);
        let userLocation = new google.maps.LatLng({
          lat: Number( this.currentPoint.lat),
          lng: Number( this.currentPoint.lng)
        });
    const distance = this.getDistance(userLocation, itemLocation);
    this.distance = distance;
        console.log("distance", distance);
  }

get f() {return this.form.controls;}

  async loadLocation() {
    const resp = await this.geolocation.getCurrentPosition();
       console.log("geo location",resp)
     let lat = resp.coords.latitude;
    let lng = resp.coords.longitude;
    
    let watch = this.geolocation.watchPosition();
watch.subscribe((data: Geoposition) => {
//  // data can be a set of coordinates, or an error (if an error occurred).
  lat = data.coords.latitude;
  lng = data.coords.longitude;
      this.currentPoint.lat = lat;
      this.currentPoint.lng = lng;
      this.initMap(lat, lng)
}, error => {
  this.errorMessage = "unable to retrieve location, ensure internet connection or location is enable for this app"
  console.log("location error ", error)
}

);
     
   
   
      // .then((resp) => {
      // const lat = resp.coords.latitude;
      // const lng = resp.coords.longitude;
      // this.currentPoint.lat = lat;
      // this.currentPoint.lng = lng;
      // this.initMap(lat, lng)
      // console.log("geo location",resp)
      // }).catch((error) => {
      //   console.log('Error getting location', error);
      // });
     
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
  dismiss() {
    this.router.navigate(['dashboard']);
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
    this.errorMessage = "";
    this.loading = true;
    const hours = this.form.get('hours').value; 
    const userId =Number(  await this.strogeService.getItem('userId'));
    
      let model = {
        equipmentId: this.equipmentsUsage.equipment.id,
        userId: userId,
        userLocation: JSON.stringify(this.currentPoint),
        allocatedHoursToUse: hours
      } as AllocateEquipmentModel;
    
    this.equipmentService.assignEquipment(model).subscribe(a => {
        console.log("result", a)
        this.alert("success, equipment assigned successfully");
      this.dismiss();
    this.loading = false;
      
    }, error => {
      this.errorMessage = error.error.data;
      console.log("errror", error);
    this.loading = false;
      
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
