
// Generated by https://quicktype.io

export interface ReportEquipmentResponse {
    message: string;
    status:  string;
    data:    EquipmentReportModel[];
}

export interface EquipmentReportModel {
    user:              User;
    creationTime:      string;
    allocatedDateTime: string;
    hasExpired: boolean;
}

export interface User {
    id:       number;
    idNo:     string;
    role:     string;
    userName: string;
}