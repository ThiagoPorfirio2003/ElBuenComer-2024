import { Pipe, PipeTransform } from '@angular/core';
import { enumTypeTable } from '../enums/tableType';

@Pipe({
  name: 'enumtype',
  standalone: true
})
export class EnumtypePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case enumTypeTable.VIP:
        return 'VIP';
      case enumTypeTable.Standar:
        return 'Estándar';
      case enumTypeTable.Special:
        return 'Especial';
      default:
        return 'Desconocido';
    }
  }
}
