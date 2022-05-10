import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];

  id_cat2: String = "";

  livros: Livro[] = []

  constructor(private service: LivroService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat2 = this.route.snapshot.paramMap.get("id_cat")!;
    this.findAll();
  }

  findAll(): void{
    this.service.findAllByCategoria(this.id_cat2).subscribe((resposta) =>{
      this.livros = resposta;
      console.log(resposta);
    });
  }

}
