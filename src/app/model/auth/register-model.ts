import { ResponseModel } from './../shared-model';


// Generated by https://quicktype.io

export interface RegisterRequestModel {
    email:     string;
    firstName: string;
    lastName:  string;
    password:  string;
}

// Generated by https://quicktype.io

export interface RequestResponseModel  extends ResponseModel {
    data:    Data;
}

export interface Data {
    id:        string;
    email:     string;
    firstName: string;
    lastName:  string;
}

