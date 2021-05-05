import { EquipmentsUsageResponseModel } from './../../model/equipments/equipments-usage-model';
import { EquipmentsResponseModel, AllocateEquipmentModel, AllocateEquipmentResponseModel } from './../../model/equipments/equipments-model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportEquipmentResponse } from 'src/app/model/report/report-equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

   baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
      this.baseUrl += '/api/v1/'
  }
  
  getall() : Observable<EquipmentsResponseModel> {
    return this.http.get<EquipmentsResponseModel>(this.baseUrl+"equipment");
  }

   get(id ) : Observable<EquipmentsUsageResponseModel> {
    return this.http.get<EquipmentsUsageResponseModel>(this.baseUrl+"equipment/"+id);
  }
  
  assignEquipment(allocateEquipmentModel: AllocateEquipmentModel): Observable<AllocateEquipmentResponseModel> {
   return  this.http.post<AllocateEquipmentResponseModel>(this.baseUrl + "equipment/assign-user/", allocateEquipmentModel);
  }
  
   getUsers(id): Observable<ReportEquipmentResponse> {
   return  this.http.get<ReportEquipmentResponse>(this.baseUrl + `equipment/${id}/users`);
   }
}
