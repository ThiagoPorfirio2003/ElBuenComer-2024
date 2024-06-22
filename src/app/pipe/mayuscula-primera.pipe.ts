import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayuscula',
  standalone: true
})
export class MayusculaPrimeraPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown 
  {
    value = value.toLowerCase()
    value[0].toUpperCase()
    return value;
  }

}
