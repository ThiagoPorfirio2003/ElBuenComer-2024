import { orderState } from "../enums/orderState";
import { product } from "./products";

export interface order
{
    id : string;
    idTable : string;
    products : Array<product>;
    creationTime : number;
    price : number;
    state : orderState;
    barFinished : boolean;
    kitchenFinished : boolean;
}
/*
id, productos : array<Productos>, tiempo estimado, idMesa, precioTotal, estadoPedido, barTerminado, cocinaTerminado
*/