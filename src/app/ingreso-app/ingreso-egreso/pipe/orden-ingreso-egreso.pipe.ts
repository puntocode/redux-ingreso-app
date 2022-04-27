import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenar'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform( items:any[] ){
    return items.sort((a,b) => {
      if(a.tipo === 'ingreso') return -1;
      else return 1;
    });
  }

}
