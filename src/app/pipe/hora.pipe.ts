import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora',
  standalone: true
})
export class HoraPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    let fecha = new Date(value);

    return `${fecha.getHours().toString()}:${fecha.getMinutes().toString()}`;
  }

}
