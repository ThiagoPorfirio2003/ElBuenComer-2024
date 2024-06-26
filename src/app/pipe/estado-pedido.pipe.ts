import { Pipe, PipeTransform } from '@angular/core';
import { orderState } from '../enums/orderState';

@Pipe({
  name: 'estadoPedido',
  standalone: true
})
export class EstadoPedidoPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let estado = "";
    switch (value)
    {
      case orderState.InPreparation:
        estado = "En preparación";
      break
      case orderState.Finished:
        estado = "Terminado";
      break
      case orderState.ForApproval:
        estado = "En aprobación";
      break
      case orderState.GivingOut:
        estado = "Entregandose";
      break
      case orderState.Accepted:
        estado = "Entregado";
      break
      case orderState.Paid:
        estado = "Pagado";
      break
      case orderState.PaidAccepted:
        estado = "Pago Confirmado";
      break
    }
    return estado
  }

}
