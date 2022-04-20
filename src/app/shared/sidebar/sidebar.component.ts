import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/service/ingreso-egreso.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre!: string;
  subscription: Subscription = new Subscription();

  constructor( public authService: AuthService,
               public ingresoEgresoService: IngresoEgresoService,
               private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
    .pipe( filter( auth => auth.user != null ))
    .subscribe( auth => this.nombre = auth.user!.nombre );
  }

  logout(){
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubscription();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
