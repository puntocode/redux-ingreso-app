import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import Swal from 'sweetalert2';
import { User } from '../models/User.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore ) { }

    //nulo a undefined si no encuentra nada | user si paso por la autenticacion
    initAuthListener() {
      this.afAuth.authState.subscribe( fbUser => console.log(fbUser));
    }


    crearUsuario( nombre: string, email: string, password: string ) {

      this.afAuth.createUserWithEmailAndPassword(email, password)
          .then( resp => {
            const user:User = {
              uid: resp.user?.uid!,
              email: resp.user?.email!,
              nombre,
            };

            this.afDB.doc(`${ user.uid }/usuario`)
                .set( user )
                .then( () =>  this.router.navigate(['/dashboard']) );
          })
          .catch( error => Swal.fire('Error en el login', error.message, 'error') );
    }


    login( email: string, password: string ) {
      this.afAuth
          .signInWithEmailAndPassword(email, password)
          .then( resp => this.router.navigate(['/dashboard']))
          .catch( error => Swal.fire('Error en el login', error.message, 'error') );
    }

    logout() {
      this.router.navigate(['/login']);
      this.afAuth.signOut();
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
