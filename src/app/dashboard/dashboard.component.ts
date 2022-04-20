import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/service/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoEgresoService.initIngresoEgresoListener();
  }

}
