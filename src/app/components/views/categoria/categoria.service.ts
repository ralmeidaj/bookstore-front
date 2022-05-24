import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../local-storage.service';
import { JwtResponse } from '../usuario/usuario-signup/jwtresponse.model';
import { Categoria } from './categoria-read/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: String = environment.baseUrl;
  auth_token: string = "";
  auth_type_token = "";

  /*headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  })*/

  JwtResponse: JwtResponse = {
      id: "",
      username: "",
      email: "",
      roles: [""],
      tokenType: "",
      accessToken: ""
  }

  constructor(private http: HttpClient, private _snack: MatSnackBar, private localStorage: LocalStorageService) { }

  findAll(page: number, size: number):Observable<Categoria[]>{
    //this.localStorage.clean();

    if (this.localStorage.get('usuarioSession')){
            
      this.JwtResponse  = this.localStorage.get('usuarioSession');
    }
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.JwtResponse.accessToken}`
      })

      const url = `${this.baseUrl}/categorias?page=${page}&size=${size}`

      return this.http.get<Categoria[]>(url, { headers: headers });
    //}
    //console.log("não tem usuário")
    //return EMPTY;
  }

  findAllCount(){
    if (this.localStorage.get('usuarioSession')){
      const url = `${this.baseUrl}/categorias/count`
      this.JwtResponse  = this.localStorage.get('usuarioSession');

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.JwtResponse.accessToken}`
      })

     // console.log(headers)

      return this.http.get<number>(url, { headers: headers })
    }
    console.log("não tem usuário")
    return EMPTY;

  }

  findById(id: String): Observable<Categoria>{
    const url = `${this.baseUrl}/categorias/${id}`;
    return this.http.get<Categoria>(url);
  }

  create(categoria: Categoria): Observable<Categoria>{
    const url = `${this.baseUrl}/categorias`
    console.log(url);
    return this.http.post<Categoria>(url, categoria);
  }

  delete(id: String): Observable<void>{
    const url = `${this.baseUrl}/categorias/${id}`;
    return this.http.delete<void>(url);
  }
  update(categoria: Categoria): Observable<Categoria>{
    const url = `${this.baseUrl}/categorias/${categoria.id}`;
    //console.log(url);
    return this.http.put<Categoria>(url, categoria)
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }


}
