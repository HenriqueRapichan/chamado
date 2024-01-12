import { Component } from '@angular/core';
import { RequisicaoService } from './services/requisicao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chamado';
  
  constructor(public requisicaoService: RequisicaoService){
    // this.buscarStatus();
  }

  // buscarStatus(){
  //   let rota = "/status";
  //   let param = {};

  //    this.requisicaoService.get(rota).then((data) =>{
  //     console.log(data);
  //   })
  // }
}
