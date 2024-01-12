import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrl: './chamados.component.scss'
})
export class ChamadosComponent implements OnInit {
  @ViewChild('adicionarChamado') adicionarChamado: any;
  @ViewChild('abrirPreviewImg') abrirPreviewImg: any;
  @ViewChild('visualizaChamado') visualizaChamado: any;
  
  public page: number = 1;

  public arquivosSelecionados: File[] = [];
  public arquivosBase64: string[] = [];

  public tempPreview: any = null;

  constructor(public modal: ModalService) {}

  ngOnInit(): void {}

  abrirModalAdicionarChamado(){
    this.modal.abrirModalLg(this.adicionarChamado);
  }

  abrirModalPreviweImg(imgPreviwe:any){
    this.tempPreview = imgPreviwe;
    this.modal.abrirModalLg(this.abrirPreviewImg);
  }

  abrirModalVisualizaChamado(){
    this.modal.abrirModalTelaCheia(this.visualizaChamado);
  }

  salvarChamado(){
    this.enviarArquivos();
  }

  resetNovoChamado(){
    this.arquivosSelecionados = [];
  }

  //RELACIONADO AO ADICIONAR ARQUIVOS
  manipularDrop(event: any): void {
    event.preventDefault();
    this.selecionarArquivos({ target: { files: event.dataTransfer.files } });
  }

  manipularArrastarSobre(event: any): void {
    event.preventDefault();
  }

  selecionarArquivos(event: any): void {
    this.arquivosSelecionados = [...this.arquivosSelecionados, ...event.target.files];
  }

  converterParaBase64(arquivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(arquivo);
    });
  }

  async enviarArquivos(): Promise<void> {
    this.arquivosBase64 = [];

    for (const arquivo of this.arquivosSelecionados) {
      try {
        const base64String = await this.converterParaBase64(arquivo);
        this.arquivosBase64.push(base64String);
      } catch (error) {
        console.error('Erro ao converter arquivo para Base64:', error);
      }
    }
    console.log('Arquivos Base64:', this.arquivosBase64);
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  isImagem(tipo: string): boolean {
    return tipo.startsWith('image/');
  }

  getBase64Preview(arquivo: File): string {
    if (this.isImagem(arquivo.type)) {
      return URL.createObjectURL(arquivo);
    }
    return ''; // Adicione lógica para outros tipos de arquivo, se necessário
  }

  removerImg(index: number): void {
    this.arquivosSelecionados.splice(index, 1);
  }
 
}
