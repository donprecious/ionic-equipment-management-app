import { AuthService } from './../../service/auth.service';
import { EquipmentsUsage, UsageLocation } from 'src/app/model/equipments/equipments-usage-model';
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
  constructor(
    public modalController: ModalController,
    private authService: AuthService,
    private geolocation: Geolocation,
  ) { }

  currentPoint = { lat: 0, lng: 0 }
  duration: string;
  async ngOnInit() {
     const locationstr = this.equipmentUsage.useage.userLocation;
    const location = JSON.parse(locationstr) as UsageLocation;
       this.initMap(location.lat, location.lng)
       this.currentPoint.lat = location.lat;
      this.currentPoint.lng = location.lng;
   
    const allocatedDateTime = moment(this.equipmentUsage.useage.allocatedDateTime);
    const creationTime = moment(this.equipmentUsage.useage.creationTime);
    this.equipmentUsage.useage.allocatedDateTime = allocatedDateTime.toString();
    this.equipmentUsage.useage.creationTime = creationTime.toString();
    
   
    let allocatedTime = new Date(this.equipmentUsage.useage.allocatedDateTime).getTime();
    let createdTime = new Date(this.equipmentUsage.useage.creationTime).getTime();
  
// Update the count down every 1 second
  const x = setInterval(async () =>{

    var currentServerTime = await this.authService.getServerCurrentTime().toPromise()
        // Get today's date and time
    const current = new Date(currentServerTime);
    const now = current.getTime()
   // const distance =  now - allocatedTime;
     
        // Find the distance between now and the count down date
    const distance = allocatedTime - now;

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
