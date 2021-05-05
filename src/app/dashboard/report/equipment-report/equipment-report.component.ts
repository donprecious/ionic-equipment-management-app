import { EquipmentReportModel } from './../../../model/report/report-equipment';
import { EquipmentsService } from './../../../service/equipments/equipments.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'

@Component({
  selector: 'app-equipment-report',
  templateUrl: './equipment-report.component.html',
  styleUrls: ['./equipment-report.component.scss'],
})
export class EquipmentReportComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private equipmentService: EquipmentsService,
     private router: Router,
  ) { }
   
  equipmentReports: EquipmentReportModel[] = [];
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.equipmentService.getUsers(id).subscribe(a => {
      this.equipmentReports = a.data;
    });
  }
  
  dateConvert(dateStr) {
    return moment(dateStr).format("DD-MMM-YYYY hh:mm:ss");
  }
  dismiss() {
    this.router.navigate(['dashboard']);
  }
}
