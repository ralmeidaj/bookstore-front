import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from './categoria-read/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: String = environment.baseUrl;
  auth_token: String = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtb2QiLCJpYXQiOjE2NTMzMzMxNzYsImV4cCI6MTY1MzQxOTU3Nn0.7QzYW3RTFEUq0cTI2AB8wj9EWb3mBeLM75WlMryRupkH7k2diq4ifl4RkS2qX-lnfPF-U_MLTAiGP_fL-lwYFw";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  })

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAll(page: number, size: number):Observable<Categoria[]>{
    
    const url = `${this.baseUrl}/categorias?page=${page}&size=${size}`
    //return this.http.get<Categoria[]>(url)
    return this.http.get<Categoria[]>(url, { headers: this.headers });
  }

  findAllCount(){
    const url = `${this.baseUrl}/categorias/count`
    return this.http.get<number>(url, { headers: this.headers })
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
