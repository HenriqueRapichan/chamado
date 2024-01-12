import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';
import { RequisicaoService } from '../../../services/requisicao.service';

@Component({
  selector: 'app-cad-sistema',
  templateUrl: './cad-sistema.component.html',
  styleUrl: './cad-sistema.component.scss'
})
export class CadSistemaComponent {
  public listaSistema: any = [];

  public sistemaSelecionado: any = {};
  public sistemaForm!: FormGroup;

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
    this.buscarSistemas();
    this.resetForm();   
  }

  resetForm(){
    this.sistemaForm = this.fb.group({
      nomeSistema: ['', [Validators.required]],
      situacao: ['A', [Validators.required]]  // Defina 'ATIVO' como a opção padrão
    });
  }

  reset(){
    this.sistemaSelecionado = {};
    this.buscarSistemas();
    this.modal.fecharModal();
  }

  abrirModalAdicionar(){
    this.resetForm(); 
    this.modal.abrirModalMd(this.adicionar);
  }

  abrirModalEditar(obj: any){
    this.sistemaSelecionado = obj;
    this.sistemaForm.setValue({
      nomeSistema: this.sistemaSelecionado.nomeSistema,
      situacao: this.sistemaSelecionado.situacao,
    });
    this.modal.abrirModalMd(this.editar);
  }
  
  abrirModalExclusao(obj: any){
    this.sistemaSelecionado = obj;
    this.modal.abrirModalSm(this.excluir);
  }

  buscarSistemas() {
    let rotas: string = "/buscarSistemas";
     this.requisicaoService.post(rotas, {}).subscribe(
      (retorno: any) => {
        this.listaSistema = [];
        this.listaSistema = retorno;
      },
    )
  }
  
  onSubmit(opcao: string) {
    debugger
    if (this.sistemaForm && this.sistemaForm.valid) {
      const nomeSistema = this.sistemaForm.get('nomeSistema')?.value;
      const situacao = this.sistemaForm.get('situacao')?.value;
    if(opcao === 'adicionar'){
      let param = {
        nomeSistema: nomeSistema,
        situacao: situacao,
      }
      let rotas: string = "/inserirSistema";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        console.log(retorno);
        this.reset();
       },
     )
    }
    if(opcao === 'editar'){ 
      let param = {
        nomeSistema: nomeSistema,
        situacao: situacao,
        codSistema: this.sistemaSelecionado.codSistema, 
      }
      console.log(param);
      let rotas: string = "/alterarSistema";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        console.log(retorno.status, retorno.msg);
        this.reset();
       },
     )
    }
      console.log(nomeSistema, situacao);
    } else {
      console.log('Por favor, preencha todos os campos corretamente.');
    }
  }

  removerCadSistema() {
    let rotas: string = "/removerCadSistema";
    let param = {
      codSistema: this.sistemaSelecionado.codSistema,
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
