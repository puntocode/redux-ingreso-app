import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IngresoEgreso } from '../models/IngresoEgreso.model';
import { SetItemsAction, UnsetItemsAction } from '../actions/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoItemsSubcription: Subscription = new Subscription();
  ingresoEgresoListenerSubcription: Subscription = new Subscription();


  constructor(private afDB: AngularFirestore,
              private authService:AuthService,
              private store:Store<AppState>) { }


  //Escucha cuando hay cambios en el state
  initIngresoEgresoListener(){
    this.ingresoEgresoListenerSubcription = this.store.select('auth')
      .pipe(
        //si se cumple se deja pasar - si NO corta
        filter(auth => auth.user != null)
      )
      .subscribe(auth => this.ingresoEgresoItems( auth.user!.uid ))
  }


  private ingresoEgresoItems( uid: string ) {

    this.ingresoEgresoItemsSubcription = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          //console.log(docData);
          return docData.map( doc => {
            const data = doc.payload.doc.data();
            return {
              uid: doc.payload.doc.id,
              data
            };
          });

        })
      )
      .subscribe((coleccion:any) => this.store.dispatch(new SetItemsAction(coleccion)));
  }

  storeIngresoEgreso(ingresoEgreso:IngresoEgreso){
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }


  cancelarSubscription(){
    this.ingresoEgresoItemsSubcription.unsubscribe();
    this.ingresoEgresoListenerSubcription.unsubscribe();
    this.store.dispatch( new UnsetItemsAction() );
  }





}
