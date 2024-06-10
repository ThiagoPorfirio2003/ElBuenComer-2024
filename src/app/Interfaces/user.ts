import { enumClientState } from "../enums/clientState";
import { enumProfile } from "../enums/profile";

export interface baseUserData
{
    name : string;
    email : string;
    photo : string;
    uid : string;
    profile : enumProfile
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
