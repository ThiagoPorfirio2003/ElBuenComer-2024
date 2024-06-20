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
}

export interface completeUserData extends baseUserData
{
    surname : string;
    dni : string;
}

export interface employe extends completeUserData
{
    cuil : string;
}

export interface client extends completeUserData
{
    state : enumClientState;
}
//Supongo que el anomino no tienen que estar en pendiente de aprobacion, por que no es un cliente nuevo. 
export interface anonimus {
    id : string;
    name : string;
    profile : enumProfile;
    photoUrl : string;
}
