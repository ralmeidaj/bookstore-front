import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/components/local-storage.service';
import { HeaderComponent } from 'src/app/components/template/header/header.component';
import { UsuarioService } from '../usuario.service';
import { UsuarioLogin } from './usuarioLogin.model';

@Component({
  selector: 'app-usuario-signup',
  templateUrl: './usuario-signup.component.html',
  styleUrls: ['./usuario-signup.component.css']
})
export class UsuarioSignupComponent implements OnInit {

  usuarioLogin: UsuarioLogin = {
    username: "",
    password: ""
  };

  hide = true;

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  constructor(private usuarioService: UsuarioService, private router: Router, private snack: MatSnackBar, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorage.clean();
  }

  logar():void{
    this.usuarioService.logar(this.usuarioLogin).subscribe((resposta)=>{
     
      this.localStorage.set("usuarioSession", resposta);
      this.usuarioService.mensagem('Login efetuado com sucesso!')
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(["/home"]);
      }, err => {
        this.usuarioService.mensagem(err.error.message)
      }
      );
      
    });
  }

}
