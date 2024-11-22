export interface WorkPlace {
    id:number
    country: string;
    name:String;
    readings:number;
    yellowAlerts: number;
    redAlerts:number;
    sensors: number;
}

export interface CreateWorkPlaceRequest {
  country: string;
  name: string;
}
