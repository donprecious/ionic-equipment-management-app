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
  
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
