import { enumClientState } from "../enums/clientState";
import { enumProfile } from "../enums/profile";

export interface userAccessData
{
    email : string;
    password : string;
}

export interface baseUserData
{
    id : string;
    name : string;
    email : string;
    profile : enumProfile;
    photoUrl : string;
    photoId : string;
}

export interface completeUserData
{
    baseData : baseUserData;
    surName : string;
    dni : string;
}

export interface employe
{
    completeData : completeUserData;
    cuil : string;
}

export interface client<T extends baseUserData | completeUserData>
{
    data : T;
    isAnonimus : boolean;
    state : enumClientState;
}