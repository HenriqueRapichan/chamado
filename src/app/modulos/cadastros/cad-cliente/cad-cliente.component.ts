import { Component, OnInit, ViewChild } from '@angular/core';
import { RequisicaoService } from '../../../services/requisicao.service';
import { ModalService } from '../../../services/modal.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cad-cliente',
  templateUrl: './cad-cliente.component.html',
  styleUrl: './cad-cliente.component.scss'
})
export class CadClienteComponent implements OnInit {
  public listaCliente: any = [];
  public clienteForm!: FormGroup;

  @ViewChild('adicionar') adicionar: any;

  constructor(
    public requisicaoService: RequisicaoService, 
    public modal: ModalService,
    private fb: FormBuilder
    ) {
      ;
  }
 
  ngOnInit() {
    this.buscarCliente();

    this.clienteForm = this.fb.group({
      nomeCliente: ['', [Validators.required]],
      situacao: ['A', [Validators.required]]  // Defina 'ATIVO' como a opção padrão
    });
  }

  abrirModalAdicionar(){
    this.modal.abrirModalMd(this.adicionar);
  }

  buscarCliente() {
    let rotas: string = "/buscarClientes";
     this.requisicaoService.post(rotas, {}).subscribe(
      (retorno: any) => {
        this.listaCliente = [];
        this.listaCliente = retorno;
      },
    )
  }
  
  onSubmit() {
    if (this.clienteForm && this.clienteForm.valid) {
      const nomeCliente = this.clienteForm.get('nomeCliente')?.value;
      const situacao = this.clienteForm.get('situacao')?.value;
      let param = {
        nomeCliente: nomeCliente,
        situacao: situacao,
      }
      let rotas: string = "/inserirCliente";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        alert(retorno);
       },
     )
      console.log(nomeCliente, situacao);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  alterarSistemas() {
    let rotas: string = "/alterarCliente";
    let param = {
      nomeCliente:'',
      situacao: '',
    }
     this.requisicaoService.post(rotas, param).subscribe(
      (retorno: any) => {
        this.listaCliente = [];
        this.listaCliente = retorno;
      },
    )
  }

  removerCadSistema() {
    let rotas: string = "/removerCadCliente";
    let param = {
      codigoCliente:'',
    }
     this.requisicaoService.post(rotas, param).subscribe(
      (retorno: any) => {
        this.listaCliente = [];
        this.listaCliente = retorno;
      },
    )
  }

}
