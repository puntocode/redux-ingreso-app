import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import Swal from 'sweetalert2';
import { User } from '../models/User.model';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../shared/accions/ui.accion';
import { SetUserAction, UnsetUserAction } from '../actions/auth.action';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription:Subscription = new Subscription();
  private usuario!:User | null;

  getUsuario(){
    return {...this.usuario};
  }

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store ) { }

    //nulo a undefined si no encuentra nada | user si paso por la autenticacion
    initAuthListener() {
      this.afAuth.authState.subscribe( fbUser => {

        if(fbUser){
          this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
            .subscribe((usuarioObj:any) => {
              const newUser = new User(usuarioObj);
              this.store.dispatch(new SetUserAction(newUser));
              this.usuario = newUser;
            })
        }else{
          this.usuario = null;
          this.userSubscription.unsubscribe();
        }

      });

    }


    crearUsuario( nombre: string, email: string, password: string ) {
      this.store.dispatch( new ActivarLoadingAction() );

      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then( resp => {
          const user:User = {
            uid: resp.user?.uid!,
            email: resp.user?.email!,
            nombre,
          };

          this.afDB.doc(`${ user.uid }/usuario`)
              .set( user )
              .then( () => {
                this.router.navigate(['/dashboard']);
                this.store.dispatch( new DesactivarLoadingAction() );
              });
        })
        .catch( error => {
          Swal.fire('Error en el login', error.message, 'error')
          this.store.dispatch( new DesactivarLoadingAction() );
        });
    }




    login( email: string, password: string ) {
      this.store.dispatch( new ActivarLoadingAction() );

      this.afAuth
          .signInWithEmailAndPassword(email, password)
          .then( resp => {
            this.router.navigate(['/dashboard']);
            this.store.dispatch( new DesactivarLoadingAction() );
          })
          .catch( error => {
            this.store.dispatch( new DesactivarLoadingAction() );
            Swal.fire('Error en el login', error.message, 'error');
          });
    }




    logout() {
      this.router.navigate(['/login']);
      this.afAuth.signOut();
      this.store.dispatch( new UnsetUserAction() );
    }




    isAuth() {
      return this.afAuth.authState.pipe(
        map( fbUser => {
          if ( fbUser == null ) this.router.navigate(['/login']);
          return fbUser != null;
        })
      );
    }
}
