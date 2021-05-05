import { RoomReportComponent } from './report/room-report/room-report.component';
import { ViewRoomInfoComponent } from './room/view-room-info/view-room-info.component';
import { ViewRoomsComponent } from './room/view-rooms/view-rooms.component';
import { EquipmentReportComponent } from './report/equipment-report/equipment-report.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewEquipmentsComponent } from './view-equipments/view-equipments.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AssignEquipmentModalComponent } from './assign-equipment-modal/assign-equipment-modal.component';
import { UseageModalComponent } from './useage-modal/useage-modal.component';
@NgModule({
  declarations: [ViewEquipmentsComponent, AssignEquipmentModalComponent,
    UseageModalComponent, EquipmentReportComponent, DashboardLayoutComponent,
    ViewRoomsComponent, ViewRoomInfoComponent, RoomReportComponent

  ],
  imports: [CommonModule, FormsModule, IonicModule, DashboardRoutingModule, ReactiveFormsModule],
  providers: [Geolocation]
})
export class DashboardModule {}
