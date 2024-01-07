import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.scss']
})
export class ChamadosComponent implements OnInit {

  chamados = [
    { id: 1, titulo: 'Chamado 1', descricao: 'Descrição do chamado 1' },
    { id: 2, titulo: 'Chamado 2', descricao: 'Descrição do chamado 2' },
    // Adicione mais chamados conforme necessário
  ];

  novoChamado = { id: 0, titulo: '', descricao: '' };
  editandoChamado: any = null;
  chamadoIndex: number = 0;
  imagemAdicaoPreview: string | null = null;
  imagemEdicaoPreview: string | null = null;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // Lógica a ser executada na inicialização do componente
  }

  adicionarChamado() {
    this.chamados.push({ ...this.novoChamado });
    this.novoChamado = { id: 0, titulo: '', descricao: '' };
  }

  editarChamado(chamado: any, index: number) {
    this.editandoChamado = { ...chamado };
    this.chamadoIndex = index;
  }

  salvarEdicao() {
    // Lógica para salvar as alterações no chamado editandoChamado
    this.chamados[this.chamadoIndex] = { ...this.editandoChamado };
    this.editandoChamado = null;
  }

  cancelarEdicao() {
    this.editandoChamado = null;
  }

  excluirChamado() {
    this.chamados.splice(this.chamadoIndex, 1);
  }

  // Abre o modal de adição
  openAdicionarModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  // Abre o modal de edição
  openEditarModal(content: any, chamado: any, index: number) {
    this.editandoChamado = { ...chamado };
    this.chamadoIndex = index;
    this.modalService.open(content, { centered: true });
  }

  // Abre o modal de exclusão
  openExcluirModal(content: any, index: number) {
    this.chamadoIndex = index;
    this.modalService.open(content, { centered: true });
  }
  onImagemSelecionada(event: any) {
    const arquivoSelecionado = event.target.files[0];

    if (arquivoSelecionado) {
      const leitor = new FileReader();
      leitor.onload = (e: any) => {
        if (event.target.id === 'imagemAdicao') {
          this.imagemAdicaoPreview = e.target.result;
        } else if (event.target.id === 'imagemEdicao') {
          this.imagemEdicaoPreview = e.target.result;
        }
      };

      leitor.readAsDataURL(arquivoSelecionado);
    }
  }
}
