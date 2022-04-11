import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  forma:FormGroup = this.formBuilder.group({
    email: ['test@mail.com', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ] ],
    password: ['123456', [Validators.required, Validators.min(6)]]
  });

  constructor(private authService:AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  login(){
    const {email, password} = this.forma.value;
    this.authService.login(email, password);
  }

}
