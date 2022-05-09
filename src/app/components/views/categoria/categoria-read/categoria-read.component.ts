import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from './categoria.model';


@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

  categorias: Categoria[] = []


  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];

  totalElements: number = 0;

  loading: boolean = false;

  portugueseRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 de ${length}`; }
  
    length = Math.max(length, 0);
  
    const startIndex = page * pageSize;
  
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
  
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
  

  constructor(private service: CategoriaService, private router: Router, private _MatPaginatorIntl: MatPaginatorIntl ) { }

  ngOnInit(): void {
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por Página';
    this._MatPaginatorIntl.firstPageLabel = 'Primeira Página';
    this._MatPaginatorIntl.lastPageLabel = 'Última Página';
    this._MatPaginatorIntl.nextPageLabel = 'Próxima Página';
    this._MatPaginatorIntl.previousPageLabel = 'Página Anterior'; 
    this._MatPaginatorIntl.getRangeLabel = this.portugueseRangeLabel;
    this.findAll("0", "5");
  }

  findAll(page: String, size: String){
    this.loading = true;
    this.service.findAll(page, size).subscribe(resposta => {
      //console.log(resposta);
      this.findAllCount();
      this.categorias = resposta;
      this.loading = false;
      this.totalElements = resposta.length
      console.log(this.totalElements)
    })
  }

  findAllCount(){
    this.loading = true;
    this.service.findAllCount().subscribe(resposta => {
      this.totalElements = resposta;
      //console.log("Count:" +  resposta);
    })
  }

  navegarParaCategoriaCreate(){
    this.router.navigate(["categorias/create"])
  }

  nextPage(event: PageEvent){
    const page = event.pageIndex.toString();
    const size = event.pageSize.toString();
    this.findAll(page, size);
  }

}
