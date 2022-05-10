import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAllByCategoria(id_cat: String, page: number, size: number): Observable<Livro[]>{
      const url = `${this.baseUrl}/livros?categoria=${id_cat}&page=${page}&size=${size}`
      console.log("url:"+url);
      return this.http.get<Livro[]>(url);
  }

  findAllCount(id_cat: String){
    const url = `${this.baseUrl}/livros/allcount/${id_cat}`;
    return this.http.get<number>(url);
  }
}
