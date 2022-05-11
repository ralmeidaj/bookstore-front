import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategoria(id_cat: String, page: number, size: number): Observable<Livro[]>{
      const url = `${this.baseUrl}/livros?categoria=${id_cat}&page=${page}&size=${size}`
      console.log("url:"+url);
      return this.http.get<Livro[]>(url);
  }

  findById(id: String):Observable<Livro> {
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.get<Livro>(url);
  }

  update(livro: Livro):Observable<Livro>{
    const url = `${this.baseUrl}/livros/${livro.id}`
    return this.http.put<Livro>(url, livro);
  }

  findAllCount(id_cat: String){
    const url = `${this.baseUrl}/livros/allcount/${id_cat}`;
    return this.http.get<number>(url);
  }

  create(livro: Livro, id_cat: String): Observable<Livro>{
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.post<Livro>(url, livro);
  }

  delete(id: String):Observable<void>{
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.delete<void>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
