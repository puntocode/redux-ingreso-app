import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path: 'estadistica', component: EstadisticaComponent},
      {path: 'detalle', component: DetalleComponent},
      {path: 'ingreso-egreso', component: IngresoEgresoComponent},
      {path: '**', redirectTo: 'estadistica'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoEgresoAppRouting { }
