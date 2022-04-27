import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoAppRouting } from './ingreso-app-routing.module';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso/actions/ingreso-egreso.reducer';


@NgModule({
  declarations: [
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    IngresoEgresoAppRouting,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ]
})
export class IngresoAppModule { }
