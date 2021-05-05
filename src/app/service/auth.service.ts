import { RegisterRequestModel, RequestResponseModel } from './../model/auth/register-model';
import { LoginRequestEnu, LoginRequestModel, LoginResponseModel, LoginResponseEnu } from './../model/auth-model';
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
  
  login(loginRequest: LoginRequestEnu): Observable<LoginResponseEnu>{
    return this.http.post<LoginResponseEnu>(this.baseUrl+"auth/login-enu", loginRequest)
  }

   register(registerRequest: RegisterRequestModel): Observable<RequestResponseModel>{
    return this.http.post<RequestResponseModel>(this.baseUrl+"auth/register", registerRequest)
  }
  
  getServerCurrentTime(): Observable<string> {
    return this.http.get<string>(this.baseUrl + 'auth/test/sys_time');
  }
}
