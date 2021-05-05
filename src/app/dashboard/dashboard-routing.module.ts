import { RoomReportComponent } from './report/room-report/room-report.component';
import { ViewRoomInfoComponent } from './room/view-room-info/view-room-info.component';
import { ViewRoomsComponent } from './room/view-rooms/view-rooms.component';
import { EquipmentReportComponent } from './report/equipment-report/equipment-report.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { ViewEquipmentsComponent } from './view-equipments/view-equipments.component';
import { AssignEquipmentModalComponent } from './assign-equipment-modal/assign-equipment-modal.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: ViewEquipmentsComponent },
      { path: 'equipments', component: ViewEquipmentsComponent },
      { path: 'equipments/view/:id', component: AssignEquipmentModalComponent },
      { path: 'equipments/report/:id', component: EquipmentReportComponent },
      { path: 'rooms', component: ViewRoomsComponent },
      { path: 'rooms/:id', component: ViewRoomInfoComponent },
      { path: 'rooms/report/:id', component: RoomReportComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
