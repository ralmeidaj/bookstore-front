import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Usuario } from '../usuario-signin/usuario.model';
import { UsuarioLogin } from './usuarioLogin.model';

@Component({
  selector: 'app-usuario-signup',
  templateUrl: './usuario-signup.component.html',
  styleUrls: ['./usuario-signup.component.css']
})
export class UsuarioSignupComponent implements OnInit {

  usuario: UsuarioLogin = {
    username: "",
    password: ""
  };

  hide = true;

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  constructor() { }

  ngOnInit(): void {
  }

  logar():void{

  }

}
