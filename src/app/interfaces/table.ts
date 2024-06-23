import { enumTableState } from "../enums/tableState";
import { enumTypeTable } from "../enums/tableType";

export interface Table
{
    number : number;
    type : enumTypeTable;
    peopleQuantity : number;
    state : enumTableState;
    idCurrentClient : string;
}