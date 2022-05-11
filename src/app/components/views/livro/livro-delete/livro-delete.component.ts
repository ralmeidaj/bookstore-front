import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  livro: Livro =  {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }
  
  id_cat: String = ''

   constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

   findById(): void{
    this.service.findById(this.livro.id!).subscribe((resposta => {
      this.livro = resposta;
    }))
  }

  update():void{
    this.service.update(this.livro).subscribe((resposta)=>{
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro alterado com sucesso!')
    }, err =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Erro ao alterar o livro!')
    }
    )
  }

  delete():void{
    this.service.delete(this.livro.id!).subscribe((resposta) =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro excluido com sucesso!')
    }, err =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Erro ao excluir o livro!')
    }
    )
  }

  cancel():void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

}
