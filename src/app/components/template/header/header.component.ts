import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username : string = "";
  isShowLogin: boolean = false;
  constructor(private localStore: LocalStorageService) { }

  ngOnInit(): void {
    console.log("veio até aqui..")
    if(this.localStore.get("usuarioSession")){
      this.username = this.localStore.get("usuarioSession").username;
      this.isShowLogin = true;
    }
  }

  getUserName(): string{
    return this.username;
  }

}
