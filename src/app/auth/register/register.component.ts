import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  cargando!:boolean;
  subscription!: Subscription;


  forma:FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    correo: ['test@mail.com', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ] ],
    password: ['123456', [Validators.required, Validators.min(6)]]
  });

  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    public store:Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);
  }

  register(){
    const {nombre, correo, password} = this.forma.value;
    this.authService.crearUsuario(nombre, correo, password)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
