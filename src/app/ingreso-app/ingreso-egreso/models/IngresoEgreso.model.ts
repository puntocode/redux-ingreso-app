

export class IngresoEgreso {
  descripcion: string;
  monto: number;
  tipo: string;
  //uid?: string;

  constructor(obj:any){
    this.descripcion = obj.descripcion;
    this.monto = obj.monto;
    this.tipo = obj.tipo;
    //this.uid = obj.uid;
  }
}
