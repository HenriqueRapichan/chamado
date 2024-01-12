import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequisicaoService } from '../../../services/requisicao.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-cad-modulo',
  templateUrl: './cad-modulo.component.html',
  styleUrl: './cad-modulo.component.scss'
})
export class CadModuloComponent {

  public listaModulos: any = [];
  public listaSistema: any = [];
  public moduloSelecionado: any = {};
  public moduloForm!: FormGroup;

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
    this.buscarModulos();
    this.buscarSistemas();
    this.resetForm();

  }

  resetForm(){
    this.moduloForm = this.fb.group({
      codSistema: ['', [Validators.required]],
      nomeModulo: ['', [Validators.required]],
      situacao: ['A', [Validators.required]]  // Defina 'ATIVO' como a opção padrão
    });
  }

  reset(){
    this.moduloSelecionado = {};
    this.buscarModulos();
    this.modal.fecharModal();
  }


  abrirModalAdicionar(){
    this.resetForm();
    this.modal.abrirModalMd(this.adicionar);
  }

  abrirModalEditar(obj: any){
    this.moduloSelecionado = obj;
    this.moduloForm.setValue({
      codSistema: this.moduloSelecionado.codSistema,
      nomeModulo: this.moduloSelecionado.nomeModulo,
      situacao: this.moduloSelecionado.situacao,
    });
    this.modal.abrirModalMd(this.editar);
  }

  abrirModalExclusao(obj: any){
    this.moduloSelecionado = obj;
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

  buscarModulos() {
    let rotas: string = "/buscarModulos";
     this.requisicaoService.post(rotas, {}).subscribe(
      (retorno: any) => {
        this.listaModulos = [];
        this.listaModulos = retorno;
      },
    )
  }

  onSubmit(opcao: string) {
    debugger
    if (this.moduloForm && this.moduloForm.valid) {
      const codSistema = this.moduloForm.get('codSistema')?.value;
      const nomeModulo = this.moduloForm.get('nomeModulo')?.value;
      const situacao = this.moduloForm.get('situacao')?.value;
    if(opcao === 'adicionar'){
      let param = {
        codSistema: codSistema,
        nomeModulo: nomeModulo,
        situacao: situacao,
      }
      if(param.codSistema === ''){
        console.log("Selecione o sistema.")
        return; 
      }
      console.log(param);
      let rotas: string = "/inserirModulo";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        console.log(retorno);
        this.reset();
       },
     )
    }
    if(opcao === 'editar'){ 
      let param = {
        codSistema: codSistema,
        nomeModulo: nomeModulo,
        situacao: situacao,
        codModulo: this.moduloSelecionado.codModulo, 
      }
      console.log(param);
      let rotas: string = "/alterarModulo";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        console.log(retorno.status, retorno.msg);
        this.reset();
       },
     )
    }
      console.log(codSistema, nomeModulo, situacao);
    } else {
      console.log('Por favor, preencha todos os campos corretamente.');
    }
  }

  removerCadModulo() {
    let rotas: string = "/removerCadModulo";
    let param = {
      codModulo: this.moduloSelecionado.codModulo,
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
