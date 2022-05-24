import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  pageSize: number = 0;
  pageIndex: number = 0;

  //size: String = "5";

  isShownLoading: boolean = false;

  /* configuração da tradução da paginação*/
  portugueseRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 de ${length}`; }
  
    length = Math.max(length, 0);
  
    const startIndex = page * pageSize;
  
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
  
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
  
  constructor(private service: CategoriaService, private router: Router, private _MatPaginatorIntl: MatPaginatorIntl, private snack: MatSnackBar ) { }

  //constructor(private service: CategoriaService, private router: Router ) { }

  ngOnInit(): void {
    /* configuração da tradução da paginação*/
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por Página';
    this._MatPaginatorIntl.firstPageLabel = 'Primeira Página';
    this._MatPaginatorIntl.lastPageLabel = 'Última Página';
    this._MatPaginatorIntl.nextPageLabel = 'Próxima Página';
    this._MatPaginatorIntl.previousPageLabel = 'Página Anterior'; 
    this._MatPaginatorIntl.getRangeLabel = this.portugueseRangeLabel;
    /*****************************************/
    this.findAll(0, 5);
  }

  async findAll(page: number, size: number){
    this.isShownLoading = true;

    //console.log("aqui...")
    //esperar
    await this.sleep(1000);
    this.service.findAll(page, size).subscribe(resposta => {
      this.findAllCount();
      this.categorias = resposta;
      this.isShownLoading = false;
      this.totalElements = resposta.length
      //console.log(this.totalElements)
    }, err =>{
      this.service.mensagem(err.error.message);
      this.router.navigate([""])
      console.log(err.error.message);
    }
    )
  }

  //esperar
  sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  findAllCount(){
    //this.loading = true;
    this.service.findAllCount().subscribe(resposta => {
      this.totalElements = resposta;
      //console.log("Count:" +  resposta);
    })
  }

  navegarParaCategoriaCreate(){
    this.router.navigate(["categorias/create"])
  }

  nextPage(event: PageEvent){
    //console.log(event);
    this.pageSize = Number(event.pageSize.toString());
    this.pageIndex = Number(event.pageIndex.toString());
    
    this.findAll(this.pageIndex, this.pageSize);
  }

}
