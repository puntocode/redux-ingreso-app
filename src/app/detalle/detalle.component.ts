import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso/models/IngresoEgreso.model';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, OnDestroy {

  items!:any[];
  subscription:Subscription = new Subscription();


  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => this.items = ingresoEgreso.items);
  }

  borrar(uid:string){
    console.log(uid);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
