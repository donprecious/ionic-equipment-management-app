import { ResponseModel } from './shared-model';
export interface AuthModel {
    
}

// Generated by https://quicktype.io

export interface LoginResponseModel extends ResponseModel {
    status: string;
    data: Data;
    message: string
}

export interface Data {
    canLogin:          boolean;
    isLockedOut:       boolean;
    isNotAllowed:      boolean;
    requiresTwoFactor: boolean;
    user:              User;
}

export interface User {
    id:                         string;
    email:                      string;
    firstName:                  string;
    lastName:                   string;
    profileImageUrl:            null;
    address:                    null;
    alpha2CountryCode:          null;
    state:                      null;
    phoneNumber:                null;
    city:                       null;
    scope:                      string;
  
}

// Generated by https://quicktype.io

export interface LoginRequestModel {
    email:    string;
    password: string;
}
