import { ModalController } from '@ionic/angular';
import { RoomService } from './../../../service/rooms/room.service';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room/room-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.scss'],
})
export class ViewRoomsComponent implements OnInit {

  constructor(
    private roomService: RoomService,
    public modalController: ModalController,
    private router: Router
  ) { }
  rooms: Room[] = [];
  ngOnInit() {
    this.roomService.getRooms().subscribe(data => {
      this.rooms = data.data;
    });
  }
doRefresh(event) {
    console.log('Begin async operation');
     this.roomService.getRooms().subscribe(data => {
      this.rooms = data.data;
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  async allocate(id) {
       this.router.navigate(['dashboard/rooms/'+id])
  }
}
