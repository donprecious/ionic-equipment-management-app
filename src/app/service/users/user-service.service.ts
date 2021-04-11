import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponseModel } from 'src/app/model/user/user-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

 baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
      this.baseUrl += '/api/v1/'
  }
  
  getUserByEmail(email: string): Observable<UserResponseModel> {
   return this.http.get<UserResponseModel>(this.baseUrl + 'users/email/' + email);
  }
}
