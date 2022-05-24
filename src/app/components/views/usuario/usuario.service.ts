import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './usuario-signin/usuario.model';
import { JwtResponse } from './usuario-signup/jwtresponse.model';
import { UsuarioLogin } from './usuario-signup/usuarioLogin.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }
  
  registrar(usuario: Usuario): Observable<Usuario>{
    const url = `${this.baseUrl}/auth/registrar`;
    return this.http.post<Usuario>(url, usuario);
  }

  logar(usuarioLogin: UsuarioLogin): Observable<JwtResponse>{
    const url = `${this.baseUrl}/auth/logar`;
    return this.http.post<JwtResponse>(url, usuarioLogin);
  }
  
  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
