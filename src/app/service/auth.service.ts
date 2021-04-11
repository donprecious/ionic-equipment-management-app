import { RegisterRequestModel, RequestResponseModel } from './../model/auth/register-model';
import { LoginRequestModel, LoginResponseModel } from './../model/auth-model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
      this.baseUrl += '/api/v1/'
  }
  
  login(loginRequest: LoginRequestModel): Observable<LoginResponseModel>{
    return this.http.post<LoginResponseModel>(this.baseUrl+"auth/login", loginRequest)
  }

   register(registerRequest: RegisterRequestModel): Observable<RequestResponseModel>{
    return this.http.post<RequestResponseModel>(this.baseUrl+"auth/register", registerRequest)
  }
  
}
