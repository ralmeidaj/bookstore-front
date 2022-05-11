import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];

  id_cat: String = "";

  livros: Livro[] = []

  totalElements: number = 0;
  pageSize: number = 0;
  pageIndex: number = 0;

  isShownLoading: boolean = false;

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router, private _MatPaginatorIntl: MatPaginatorIntl) { }


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

  ngOnInit(): void {
    /* configuração da tradução da paginação*/
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por Página';
    this._MatPaginatorIntl.firstPageLabel = 'Primeira Página';
    this._MatPaginatorIntl.lastPageLabel = 'Última Página';
    this._MatPaginatorIntl.nextPageLabel = 'Próxima Página';
    this._MatPaginatorIntl.previousPageLabel = 'Página Anterior'; 
    this._MatPaginatorIntl.getRangeLabel = this.portugueseRangeLabel;
    /*****************************************/
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.findAll(0, 5);
  }

  findAll(page: number, size: number): void{
    this.service.findAllByCategoria(this.id_cat, page, size).subscribe((resposta) =>{
      this.findAllCount();
      this.livros = resposta;
      console.log(resposta);
    });
  }

  findAllCount(){
    //this.loading = true;
    this.service.findAllCount(this.id_cat).subscribe(resposta => {
      this.totalElements = resposta;
      console.log("Count:" +  resposta);
    })
  }

  nextPage(event: PageEvent){
    //console.log(event);
    this.pageSize = Number(event.pageSize.toString());
    this.pageIndex = Number(event.pageIndex.toString());
    
    this.findAll(this.pageIndex, this.pageSize);
  }

  nagegharParaCriarLivro():void{
    this.router.navigate([`categorias/${this.id_cat}/livros/create`])
  }

}
