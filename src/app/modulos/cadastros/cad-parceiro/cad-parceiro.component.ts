import { Component, ViewChild } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { RequisicaoService } from '../../../services/requisicao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cad-parceiro',
  templateUrl: './cad-parceiro.component.html',
  styleUrl: './cad-parceiro.component.scss'
})
export class CadParceiroComponent {
  public listaParceiro: any = [];
  public parceiroSelecionado: any = {};
  public parceiroForm!: FormGroup;

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
    this.buscarParceiros();
    this.resetForm();
  }

  resetForm(){
    this.parceiroForm = this.fb.group({
      nomeParceiro: ['', [Validators.required]],
      situacao: ['A', [Validators.required]]  // Defina 'ATIVO' como a opção padrão
    });
  }

  reset(){
    this.parceiroSelecionado = {};
    this.buscarParceiros();
    this.modal.fecharModal();
  }


  abrirModalAdicionar(){
    this.resetForm();
    this.modal.abrirModalMd(this.adicionar);
  }

  abrirModalEditar(obj: any){
    this.parceiroSelecionado = obj;
    this.parceiroForm.setValue({
      nomeParceiro: this.parceiroSelecionado.nomeParceiro,
      situacao: this.parceiroSelecionado.situacao,
    });
    this.modal.abrirModalMd(this.editar);
  }

  abrirModalExclusao(obj: any){
    this.parceiroSelecionado = obj;
    this.modal.abrirModalSm(this.excluir);
  }

  buscarParceiros() {
    let rotas: string = "/buscarParceiros";
     this.requisicaoService.post(rotas, {}).subscribe(
      (retorno: any) => {
        this.listaParceiro = [];
        this.listaParceiro = retorno;
      },
    )
  }

  onSubmit(opcao: string) {
    debugger
    if (this.parceiroForm && this.parceiroForm.valid) {
      const nomeParceiro = this.parceiroForm.get('nomeParceiro')?.value;
      const situacao = this.parceiroForm.get('situacao')?.value;
    if(opcao === 'adicionar'){
      let param = {
        nomeParceiro: nomeParceiro,
        situacao: situacao,
      }
      let rotas: string = "/inserirParceiro";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        console.log(retorno);
        this.reset();
       },
     )
    }
    if(opcao === 'editar'){ 
      let param = {
        nomeParceiro: nomeParceiro,
        situacao: situacao,
        codParceiro: this.parceiroSelecionado.codParceiro, 
      }
      console.log(param);
      let rotas: string = "/alterarParceiro";
      this.requisicaoService.post(rotas, param).subscribe(
       (retorno: any) => {
        console.log(retorno.status, retorno.msg);
        this.reset();
       },
     )
    }
      console.log(nomeParceiro, situacao);
    } else {
      console.log('Por favor, preencha todos os campos corretamente.');
    }
  }

  removerCadCliente() {
    let rotas: string = "/removerCadParceiro";
    let param = {
      codParceiro: this.parceiroSelecionado.codParceiro,
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
