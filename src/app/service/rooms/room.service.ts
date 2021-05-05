import { ResponseModel } from './../../model/shared-model';
import { GetRoomsResponseModel, UserRoomResponseModel, AssignRoomRequestModel, GetRoomSingleResponseModel } from './../../model/room/room-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
   baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
      this.baseUrl += '/api/v1/'
  }
   
  getRooms(): Observable<GetRoomsResponseModel> {
    return this.http.get<GetRoomsResponseModel>(this.baseUrl + 'rooms'); 
  }
   getRoom(id): Observable<GetRoomSingleResponseModel> {
    return this.http.get<GetRoomSingleResponseModel>(this.baseUrl + 'rooms/'+id); 
  }

  getRoomUsers(roomId): Observable<UserRoomResponseModel> {
    return this.http.get<UserRoomResponseModel>(this.baseUrl + `rooms/${roomId}/users`); 
  }

  AssignUser(assignRoomModel: AssignRoomRequestModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.baseUrl + `rooms/assign-user`, assignRoomModel); 
  }
  
}
