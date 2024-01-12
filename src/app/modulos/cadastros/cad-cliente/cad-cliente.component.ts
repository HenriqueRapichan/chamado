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
  public clienteSelecionado: any = {};
  public clienteForm!: FormGroup;

  @ViewChild('adicionar') adicionar: any;
  @ViewChild('editar') editar: any;
  @ViewChild('excluir') excluir: any;

  constructor(
    public requisicaoService: RequisicaoService, 
    public modal: ModalService,
    private fb: FormBuilder
    ) {
      ;
  }
 
  ngOnInit() {
    this.buscarClientes();
    this.resetForm();
  }

  resetForm(){
    this.clienteForm = this.fb.group({
      nomeCliente: ['', [Validators.required]],
      situacao: ['A', [Validators.required]]  // Defina 'ATIVO' como a opção padrão
    });
  }

  reset(){
    this.clienteSelecionado = {};
    this.buscarClientes();
    this.modal.fecharModal();
  }


  abrirModalAdicionar(){
    this.resetForm();
    this.modal.abrirModalMd(this.adicionar);
  }

  abrirModalEditar(obj: any){
    this.clienteSelecionado = obj;
    this.clienteForm.setValue({
      nomeCliente: this.clienteSelecionado.nomeCliente,
      situacao: this.clienteSelecionado.situacao,
    });
    this.modal.abrirModalMd(this.editar);
  }

  abrirModalExclusao(obj: any){
    this.clienteSelecionado = obj;
    this.modal.abrirModalSm(this.excluir);
  }

  buscarClientes() {
    let rotas: string = "/buscarClientes";
     this.requisicaoService.post(rotas, {}).subscribe(
      (retorno: any) => {
        this.listaCliente = [];
        this.listaCliente = retorno;
      },
    )
  }

  onSubmit(opcao: string) {
    debugger
    if (this.clienteForm && this.clienteForm.valid) {
      const nomeCliente = this.clienteForm.get('nomeCliente')?.value;
      const situacao = this.clienteForm.get('situacao')?.value;
    if(opcao === 'adicionar'){
      let param = {
        nomeCliente: nomeCliente,
        situacao: situacao,
      }
      let rotas: string = "/inserirCliente";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        console.log(retorno);
        this.reset();
       },
     )
    }
    if(opcao === 'editar'){ 
      let param = {
        nomeCliente: nomeCliente,
        situacao: situacao,
        codCliente: this.clienteSelecionado.codCliente, 
      }
      console.log(param);
      let rotas: string = "/alterarCliente";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        console.log(retorno.status, retorno.msg);
        this.reset();
       },
     )
    }
      console.log(nomeCliente, situacao);
    } else {
      console.log('Por favor, preencha todos os campos corretamente.');
    }
  }

  removerCadCliente() {
    let rotas: string = "/removerCadCliente";
    let param = {
      codCliente: this.clienteSelecionado.codCliente,
    }
    console.log(param)
     this.requisicaoService.post(rotas, param).subscribe(
      (retorno: any) => {
        console.log(retorno.status, retorno.msg);
        this.reset();
      },
    )
  }

}
