import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayuscula',
  standalone: true
})
export class MayusculaPrimeraPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown 
  {
    value = value.toLowerCase();
    value = value.charAt(0).toUpperCase() + value.slice(1);
    return value;
  }

}
