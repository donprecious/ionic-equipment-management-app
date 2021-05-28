import { UserRoom } from './../../../model/room/room-model';
import { RoomService } from './../../../service/rooms/room.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-room-report',
  templateUrl: './room-report.component.html',
  styleUrls: ['./room-report.component.scss'],
})
export class RoomReportComponent implements OnInit {

 constructor(private route: ActivatedRoute,
    private roomService: RoomService,
     private router: Router,
  ) { }
   
  userRooms: UserRoom[] = [];
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomUsers(id).subscribe(a => {
      this.userRooms = a.data;
    });
  }
  
  dateConvert(dateStr) {
    return moment(dateStr).format("DD-MMM-YYYY hh:mm:ss");
  }
  dismiss() {
    this.router.navigate(['dashboard/rooms']);
  }

}
