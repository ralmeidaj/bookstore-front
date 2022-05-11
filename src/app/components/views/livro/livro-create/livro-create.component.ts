import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  livro: Livro =  {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }
  
  id_cat: String = ''

  titulo = new FormControl('', [Validators.minLength(3)])
  nome_autor = new FormControl('', [Validators.minLength(3)])
  texto = new FormControl('', [Validators.minLength(3)])

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
  }

  create():void{
    this.service.create(this.livro, this.id_cat).subscribe((resposta)=>{
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro criado com sucesso!')
    },err =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Erro ao criar novo livro!')
    }
    )
  }

  getMessage(){
    if(this.titulo.invalid){
      return "O campo TITULO deve ser entre 3 e 100 caracter";
    }
    if(this.nome_autor.invalid){
      return "O campo NOME DO AUTOR deve ser entre 3 e 100 caracter";
    }
    if(this.texto.invalid){
      return "O campo TEXTO deve ser entre 10 e 2.000.000 caracter";
    }
    return false;
  }

}
