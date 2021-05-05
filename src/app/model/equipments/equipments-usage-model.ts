import { ResponseModel } from './../shared-model';

// Generated by https://quicktype.io

export interface EquipmentsUsageResponseModel extends ResponseModel {
    data:    EquipmentsUsage;
}

export interface EquipmentsUsage {
    equipment: Equipment;
    useage:    Useage;
}
// Generated by https://quicktype.io

export interface Useage {
    enuUserId:         number;
    userName:          string;
    idNo:              string;
    name:              string;
    allocatedDateTime: string;
    roomId:            string;
    creationTime:      string;
    userLocation:      string;
}

export interface Equipment {
    id:          number;
    name:          string;
    description:   string;
    imageUrl:      string;
    isInUsed:      boolean;
    idNo:          string;
    positionInMap: string;
    roomNo:        string;
    accessLevel:   string;
    creationTime:  string;
}

export interface UsageLocation{
    lat: number;
    lng: number;
}
