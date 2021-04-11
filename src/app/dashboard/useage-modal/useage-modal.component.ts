import { EquipmentsUsage } from 'src/app/model/equipments/equipments-usage-model';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as moment  from 'moment'
@Component({
  selector: 'app-useage-modal',
  templateUrl: './useage-modal.component.html',
  styleUrls: ['./useage-modal.component.scss'],
})
export class UseageModalComponent implements OnInit {
  @Input() equipmentUsage : EquipmentsUsage 
  constructor(public modalController: ModalController,  private geolocation: Geolocation,) {}

  currentPoint = { lat: 0, lng: 0 }
  duration: string;
  ngOnInit() {

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
    const allocatedDateTime = moment(this.equipmentUsage.useage.allocatedDateTime);
    const creationTime = moment(this.equipmentUsage.useage.creationTime);
    this.equipmentUsage.useage.allocatedDateTime = allocatedDateTime.toString();
    this.equipmentUsage.useage.creationTime = creationTime.toString();
     
   
     let countDownDate = new Date(this.equipmentUsage.useage.allocatedDateTime).getTime();

// Update the count down every 1 second
  const x = setInterval(() =>{

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance =  countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
      this.duration = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          this.duration = "EXPIRED";
        }
        }, 1000);
  
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
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
