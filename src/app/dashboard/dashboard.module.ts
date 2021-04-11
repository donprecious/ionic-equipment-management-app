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
  declarations: [ViewEquipmentsComponent, AssignEquipmentModalComponent, UseageModalComponent, DashboardLayoutComponent],
  imports: [CommonModule, FormsModule, IonicModule, DashboardRoutingModule, ReactiveFormsModule],
  providers: [Geolocation]
})
export class DashboardModule {}
