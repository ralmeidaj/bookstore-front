import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria-read/categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {


  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }
  
  constructor(private service: CategoriaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
   
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta => {
      this.categoria = resposta
      console.log(this.categoria)
    }))
  }

  update(): void{
    this.service.update(this.categoria).subscribe((resposta)=> {
      this.service.mensagem("Categoria alterada com sucesso")
      this.router.navigate(["categorias"])
     }, err => {
      for (let i=0; i < err.error.errors.length; i++){
        console.log(err.error.errors[i].messagem);
      this.service.mensagem(err.error.errors[i].messagem);
      }
    }
    )
  }

  cancel():void {
    this.router.navigate(["categorias"])
  }

}
