import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { UsuarioService } from "../usuario.service";
import { Usuario } from "./usuario.model";

@Component({
  selector: "app-usuario-signin",
  templateUrl: "./usuario-signin.component.html",
  styleUrls: ["./usuario-signin.component.css"],
})
export class UsuarioSigninComponent implements OnInit {

  usuario: Usuario = {
    username: "",
    email: "",
    password: "",
    role: [""],
  };

  hide = true;

  usernameFormControl = new FormControl("");
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl("", [Validators.required]);

  matcher = new ErrorStateMatcher();

  roleformcontrols = new FormControl();
  roleList: string[] = ["mod", "user"];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {}

  registrar() : void{
    console.log(this.usuario.role);
    this.usuarioService.registrar(this.usuario).subscribe((resposta)=>{
      this.router.navigate([`/`])
      this.usuarioService.mensagem("Usuario registrado com sucesso!")
    })

  }

  getMessage(){
    if(this.usernameFormControl.invalid){
      return "O campo User name deve ser informado.";
    }
    return false;
  }


}
