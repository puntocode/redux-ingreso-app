import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  subscription:Subscription = new Subscription();

  ingresos!:number;
  egresos!:number;

  cuantosIngresos!:number;
  cuantosEgresos!:number;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => this.contarIE(ingresoEgreso.items));
  }


  contarIE(items:any[]){
    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items.forEach(item => {
      if(item.data.tipo === 'ingreso' ){
        this.cuantosIngresos ++;
        this.ingresos += item.data.monto;
      }else{
        this.cuantosEgresos ++;
        this.egresos += item.data.monto;
      }
    });
  }

}
