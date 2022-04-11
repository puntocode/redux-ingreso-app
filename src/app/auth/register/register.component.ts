import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  forma:FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    correo: ['test@mail.com', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ] ],
    password: ['123456', [Validators.required, Validators.min(6)]]
  });

  constructor(private authService:AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
    const {nombre, correo, password} = this.forma.value;
    this.authService.crearUsuario(nombre, correo, password)
  }

}
