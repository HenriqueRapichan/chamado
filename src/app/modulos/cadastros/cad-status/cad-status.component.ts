import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequisicaoService } from '../../../services/requisicao.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-cad-status',
  templateUrl: './cad-status.component.html',
  styleUrl: './cad-status.component.scss'
})
export class CadStatusComponent {
  public listaStatus: any = [];

  public statusSelecionado: any = {};
  public statusForm!: FormGroup;

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
    this.buscarStatus();
    this.resetForm();   
  }

  resetForm(){
    this.statusForm = this.fb.group({
      descricao: ['', [Validators.required]]
    });
  }

  reset(){
    this.statusSelecionado = {};
    this.buscarStatus();
    this.modal.fecharModal();
  }

  abrirModalAdicionar(){
    this.resetForm(); 
    this.modal.abrirModalMd(this.adicionar);
  }

  abrirModalEditar(obj: any){
    this.statusSelecionado = obj;
    this.statusForm.setValue({
      descricao: this.statusSelecionado.descricao,
    });
    this.modal.abrirModalMd(this.editar);
  }
  
  abrirModalExclusao(obj: any){
    this.statusSelecionado = obj;
    this.modal.abrirModalSm(this.excluir);
  }

  buscarStatus() {
    let rotas: string = "/buscarStatus";
     this.requisicaoService.post(rotas, {}).subscribe(
      (retorno: any) => {
        this.listaStatus = [];
        this.listaStatus = retorno;
      },
    )
  }
  
  onSubmit(opcao: string) {
    debugger
    if (this.statusForm && this.statusForm.valid) {
      const descricao = this.statusForm.get('descricao')?.value;
    if(opcao === 'adicionar'){
      let param = {
        descricao: descricao,
      }
      let rotas: string = "/inserirStatus";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        console.log(retorno);
        this.reset();
       },
     )
    }
    if(opcao === 'editar'){ 
      let param = {
        descricao: descricao,
        codStatus: this.statusSelecionado.codStatus, 
      }
      console.log(param);
      let rotas: string = "/alterarStatus";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        console.log(retorno.status, retorno.msg);
        this.reset();
       },
     )
    }
      console.log(descricao);
    } else {
      console.log('Por favor, preencha todos os campos corretamente.');
    }
  }

  removerCadSistema() {
    let rotas: string = "/removerCadStatus";
    let param = {
      codStatus: this.statusSelecionado.codStatus,
    }
    console.log(param, 'removerCadastro');
     this.requisicaoService.post(rotas, param).subscribe(
      (retorno: any) => {
        console.log(retorno.status, retorno.msg);
        this.reset();
      },
    )
  }

}
