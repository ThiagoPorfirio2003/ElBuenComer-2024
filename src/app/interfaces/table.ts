import { enumTypeTable } from "../enums/tableType";

export interface Table
{
    id : string;
    number : string;
    type : enumTypeTable;
    peopleQuantity : number;
    isFree : boolean;
    idCurrentClient : string;
    /*
    numero, cantidad de comensals, tipo (VIP, estandar, para discapacitados),
    estaOcupada, IdCliente
    */
}