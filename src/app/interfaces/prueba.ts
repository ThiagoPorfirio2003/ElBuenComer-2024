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

export interface anonimusClient extends baseUserData
{
    state : enumClientState;
}


/*
    Cliente: Nombre, apellido, DNI, foto, si esta pendiente de aprobacion, si esta aprobado. Se puede hacer un enum (pendienteDeAprobacion, aprobado, rechazado), esAnonimo
    
    Cliente anonimo: Nombre y foto

    Duenio/ Supervisor: Nombre, apellido, DNI, CUIL, foto y perfil (duenio o supervisor)

    Empleados: Nombre, apellido, DNI, CUIL, foto y tipo de empleado
*/