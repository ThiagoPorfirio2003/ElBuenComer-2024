import { productInOrder } from "./order";

export interface bill
{
    id : string;
    idOrder : string;
    idClient : string;
    products : Array<productInOrder>;
    subTotal : number;
    tip : number;
    total : number;
}