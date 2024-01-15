import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequisicaoService } from '../../../services/requisicao.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-cad-tipo-detalhamento',
  templateUrl: './cad-tipo-detalhamento.component.html',
  styleUrl: './cad-tipo-detalhamento.component.scss'
})
export class CadTipoDetalhamentoComponent {
  public listaTipoDetalhamento: any = [];

  public tipoDetalhamentoSelecionado: any = {};
  public tipoDetalhamentoForm!: FormGroup;

  @ViewChild('adicionar') adicionar: any;
  @ViewChild('editar') editar: any;
  @ViewChild('excluir') excluir: any;

  constructor(
    public requisicaoService: RequisicaoService, 
    public modal: ModalService,
    private fb: FormBuilder
    ) {}
 
  ngOnInit() {
    this.buscarTipoDetalhamento();
    this.resetForm();   
  }

  resetForm(){
    this.tipoDetalhamentoForm = this.fb.group({
      descricao: ['', [Validators.required]]
    });
  }

  reset(){
    this.tipoDetalhamentoSelecionado = {};
    this.buscarTipoDetalhamento();
    this.modal.fecharModal();
  }

  abrirModalAdicionar(){
    this.resetForm(); 
    this.modal.abrirModalMd(this.adicionar);
  }

  abrirModalEditar(obj: any){
    this.tipoDetalhamentoSelecionado = obj;
    this.tipoDetalhamentoForm.setValue({
      descricao: this.tipoDetalhamentoSelecionado.descricao,
    });
    this.modal.abrirModalMd(this.editar);
  }
  
  abrirModalExclusao(obj: any){
    this.tipoDetalhamentoSelecionado = obj;
    this.modal.abrirModalSm(this.excluir);
  }

  buscarTipoDetalhamento() {
    let rotas: string = "/buscarTipoDetalhamento";
     this.requisicaoService.post(rotas, {}).subscribe(
      (retorno: any) => {
        this.listaTipoDetalhamento = [];
        this.listaTipoDetalhamento = retorno;
      },
    )
  }
  
  onSubmit(opcao: string) {
    debugger
    if (this.tipoDetalhamentoForm && this.tipoDetalhamentoForm.valid) {
      const descricao = this.tipoDetalhamentoForm.get('descricao')?.value;
    if(opcao === 'adicionar'){
      let param = {
        descricao: descricao,
      }
      let rotas: string = "/inserirTipoDetalhamento";
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
        codTipoDetalhamento: this.tipoDetalhamentoSelecionado.codTipoDetalhamento, 
      }
      console.log(param);
      let rotas: string = "/alterarTipoDetalhamento";
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
    let rotas: string = "/removerCadTipoDetalhamento";
    let param = {
      codTipoDetalhamento: this.tipoDetalhamentoSelecionado.codTipoDetalhamento,
    }
    console.log(param, 'removerCadTipoDetalhamento');
     this.requisicaoService.post(rotas, param).subscribe(
      (retorno: any) => {
        console.log(retorno.status, retorno.msg);
        this.reset();
      },
    )
  }
}
