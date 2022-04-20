import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from './models/IngresoEgreso.model';
import { IngresoEgresoService } from './service/ingreso-egreso.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/accions/ui.accion';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  tipo:string = 'ingreso';
  loadingSubs:Subscription = new Subscription();
  loading!:boolean;

  forma: FormGroup = new FormGroup({
    'descripcion': new FormControl('', Validators.required),
    'monto': new FormControl(0, Validators.min(1)),
  });


  constructor(private ingresoEgresoService: IngresoEgresoService,
              private store:Store<AppState>) { }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui')
      .subscribe( ui => this.loading = ui.isLoading);
  }

  insertar(){
    const ingresoEgreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo });
    this.store.dispatch(new ActivarLoadingAction());

    this.ingresoEgresoService.storeIngresoEgreso(ingresoEgreso)
      .then( () => {
        this.forma.reset({monto:0})
        Swal.fire('Creado', `${this.tipo} creado correctamente!!`, 'success');
        this.store.dispatch(new DesactivarLoadingAction());
      });
  }


  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

}
