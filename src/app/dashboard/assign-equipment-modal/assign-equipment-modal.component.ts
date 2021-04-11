import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentsService } from './../../service/equipments/equipments.service';
import { AllocateEquipmentModel } from './../../model/equipments/equipments-model';
/// <reference types="google.maps" />
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Equipment, EquipmentsUsage } from 'src/app/model/equipments/equipments-usage-model';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {} from 'google.maps'
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
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    
  }

    form : FormGroup
  
    currentPoint = { lat: 0, lng: 0 }
    loading: boolean = false;
    errorMessage = '';

  ngOnInit() {
     this.form = this.fb.group({
        groupId: ['', Validators.required]
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.equipmentService.get(id).subscribe(a => {
      this.loading = false;
      this.equipmentsUsage = a.data;
      
    }, err => {
      console.log('retriveal error ', err);
    })
    this.geolocation.getCurrentPosition().then((resp) => {
      const lat = resp.coords.latitude;
      const lng = resp.coords.longitude;
      this.currentPoint.lat = lat;
      this.currentPoint.lng = lng;
      this.initMap(lat, lng)
      console.log("geo location",resp)
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      // let watch = this.geolocation.watchPosition();
      // watch.subscribe((data) => {
      // // data can be a set of coordinates, or an error (if an error occurred).
      // // data.coords.latitude
      // // data.coords.longitude
      //   console.log("change of location ", watch)
      // });
      
  }

get f() {return this.form.controls;}

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
  
  submit() {
  
    if (this.form.invalid) {
      this.errorMessage = "group id required"
      return;
    }
    if (this.currentPoint.lat == 0 && this.currentPoint.lng == 0) {
      this.errorMessage = 'location not found, ensure to turn on internet and enable location'
      return;
    }
      const roomId = this.form.controls.groupId.value;
      let model = {
        equipmentId: this.equipmentsUsage.equipment.id,
        userId: localStorage.getItem('userId'),
        userLocation: JSON.stringify(this.currentPoint),
        roomId: roomId
      } as AllocateEquipmentModel;
    
    
    this.equipmentService.assignEquipment(model).subscribe(a => {
        console.log("result", a)
        this.alert("success, equipment assigned successfully");
        this.dismiss();
      }, error => {
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
  
 
}
