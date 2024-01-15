import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequisicaoService } from '../../../services/requisicao.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrl: './cad-usuario.component.scss'
})
export class CadUsuarioComponent {

  public listaUsuario: any = [];
  public usuarioSelecionado: any = {};
  public usuarioForm!: FormGroup;

  @ViewChild('adicionar') adicionar: any;
  @ViewChild('editar') editar: any;
  @ViewChild('excluir') excluir: any;

  constructor(
    public requisicaoService: RequisicaoService,
    public modal: ModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buscarUsuarios();
    this.resetForm();
  }

  resetForm() {
    this.usuarioForm = this.fb.group({
      cpfUsuario: ['', [Validators.required]],
      nomeUsuario: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tipoUsuario: ['I', [Validators.required]], // Defina 'I' Interno 'E' Externo como a opção padrão
      senha: ['', [Validators.required]],
      situacao: ['A', [Validators.required]],
      trocarSenha: [false],  // Defina 'ATIVO' como a opção padrão
    });
  }

  reset() {
    this.usuarioSelecionado = {};
    this.buscarUsuarios();
    this.modal.fecharModal();
  }


  abrirModalAdicionar() {
    this.resetForm();
    this.modal.abrirModalLg(this.adicionar);
  }

  abrirModalEditar(obj: any) {
    debugger
    this.usuarioSelecionado = obj;
    console.log(this.usuarioSelecionado);

    this.usuarioForm.setValue({
      cpfUsuario: this.usuarioSelecionado.cpfUsuario,
      nomeUsuario: this.usuarioSelecionado.nomeUsuario,
      senha: this.usuarioSelecionado.senha,
      telefone: this.usuarioSelecionado.telefone,
      email: this.usuarioSelecionado.email,
      tipoUsuario: this.usuarioSelecionado.tipoUsuario,
      trocarSenha: this.usuarioSelecionado.trocarSenha,
      situacao: this.usuarioSelecionado.situacao
    });

    this.modal.abrirModalLg(this.editar);
  }

  abrirModalExclusao(obj: any) {
    this.usuarioSelecionado = obj;
    this.modal.abrirModalSm(this.excluir);
  }

  buscarUsuarios() {
    let rotas: string = "/buscarUsuarios";
    this.requisicaoService.post(rotas, {}).subscribe(
      (retorno: any) => {
        this.listaUsuario = [];
        this.listaUsuario = retorno;
      },
    )
  }

  onSubmit(opcao: string) {
    debugger

    if (this.usuarioForm && this.usuarioForm.valid) {
      if (opcao === 'adicionar') {
        const cpfUsuario = this.usuarioForm.get('cpfUsuario')?.value;
        const nomeUsuario = this.usuarioForm.get('nomeUsuario')?.value;
        const telefone = this.usuarioForm.get('telefone')?.value;
        const email = this.usuarioForm.get('email')?.value;
        const tipoUsuario = this.usuarioForm.get('tipoUsuario')?.value;
        const senha = this.usuarioForm.get('senha')?.value;
        const situacao = this.usuarioForm.get('situacao')?.value;

        let param = {
          cpfUsuario: cpfUsuario,
          nomeUsuario: nomeUsuario,
          telefone: telefone,
          email: email,
          tipoUsuario: tipoUsuario,
          senha: senha,
          situacao: situacao,
        }
        let rotas: string = "/inserirUsuario";
        this.requisicaoService.post(rotas, param).subscribe(
          (retorno: any) => {
            console.log(retorno);
            this.reset();
          },
        )
      }

      if (opcao === 'editar') {
        const nomeUsuario = this.usuarioForm.get('nomeUsuario')?.value;
        const telefone = this.usuarioForm.get('telefone')?.value;
        const email = this.usuarioForm.get('email')?.value;
        const tipoUsuario = this.usuarioForm.get('tipoUsuario')?.value;
        const situacao = this.usuarioForm.get('situacao')?.value;

        let param = {
          nomeUsuario: nomeUsuario,
          telefone: telefone,
          email: email,
          tipoUsuario: tipoUsuario,
          situacao: situacao,
          cpfUsuario: this.usuarioSelecionado.cpfUsuario,
        }
        console.log(param);
        let rotas: string = "/alterarUsuario";
        this.requisicaoService.post(rotas, param).subscribe(
          (retorno: any) => {
            console.log(retorno.status, retorno.msg);
            this.reset();
          },
        )
      }
    } else {
      console.log('Por favor, preencha todos os campos corretamente.');
    }

  }

  removerCadCliente() {
    let rotas: string = "/removerCadUsuario";
    let param = {
      cpfUsuario: this.usuarioSelecionado.cpfUsuario,
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
