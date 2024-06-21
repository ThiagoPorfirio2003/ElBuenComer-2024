import { enumTypeTable } from "../enums/tableType";

export interface Table
{
    number : number;
    type : enumTypeTable;
    peopleQuantity : number;
    isFree : boolean;
    idCurrentClient : string;
}