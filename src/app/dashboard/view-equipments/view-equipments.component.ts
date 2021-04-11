import { Router } from '@angular/router';
import { EquipmentsService } from './../../service/equipments/equipments.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AssignEquipmentModalComponent } from '../assign-equipment-modal/assign-equipment-modal.component';
import { UseageModalComponent } from '../useage-modal/useage-modal.component';
import { EquipmentModel } from 'src/app/model/equipments/equipments-model';
import { EquipmentsUsage } from 'src/app/model/equipments/equipments-usage-model';

@Component({
  selector: 'app-view-equipments',
  templateUrl: './view-equipments.component.html',
  styleUrls: ['./view-equipments.component.scss'],
})
export class ViewEquipmentsComponent implements OnInit {
  constructor(public modalController: ModalController, private equipmentService: EquipmentsService, private router: Router) {}
  equipments: EquipmentModel[] = []
  ngOnInit() {
    this.equipmentService.getall().subscribe(a => {
      this.equipments = a.data;
      console.log('equipments fetch result')
    })
  }
 doRefresh(event) {
    console.log('Begin async operation');
     this.equipmentService.getall().subscribe(a => {
      this.equipments = a.data;
      console.log('equipments fetch result', a)
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  async allocate(id) {
    this.equipmentService.get(id).subscribe(a => {
      const data = a.data;
      
      if (!data.useage) {
        this.router.navigate(['dashboard/equipments/view/'+data.equipment.id])
       // this.showAssignEquipment(data);
      } else {
        this.showUsage(data);
      }
    })
    
  }

  async showUsage(equipment: EquipmentsUsage) {
    const modal = await this.modalController.create({
      component: UseageModalComponent,
      componentProps: {
        equipmentUsage : equipment
      }
    });
    return await modal.present();
  }
  async showAssignEquipment(equipment: EquipmentsUsage) {
    const modal = await this.modalController.create({
      component: AssignEquipmentModalComponent,
       componentProps: {
        equipmentUsage : equipment
      }
    });
    return await modal.present();
  }
}
