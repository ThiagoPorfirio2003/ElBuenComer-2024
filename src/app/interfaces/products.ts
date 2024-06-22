import { Photo } from "@capacitor/camera";

export interface product
{
    id : string;
    name : string;
    description : string;
    time : number;
    price : number;
    isFood : boolean;
    photoUrl : Array<any>;
}