import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modal: NgbModal) { }

  public ngbModalOptionsSm: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'sm',
    animation: true,
  };

  public ngbModalOptionsMd: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'md',
    animation: true,
  };

  public ngbModalOptionsLg: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg',
    animation: true,
  };

  public ngbModalOptionsXl: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl',
    animation: true,
  };

  public ngbModalOptionsTelaCheia: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl',
    animation: true,
    fullscreen:true,
  };

  abrirModalSm(modal: any){
    this.modal.open(modal, this.ngbModalOptionsSm);
  }

  abrirModalMd(modal: any){
    this.modal.open(modal, this.ngbModalOptionsMd);
  }

  abrirModalLg(modal: any){
    this.modal.open(modal, this.ngbModalOptionsLg);
  }

  abrirModalXl(modal: any){
    this.modal.open(modal, this.ngbModalOptionsXl);
  }

  abrirModalTelaCheia(modal: any){
    this.modal.open(modal, this.ngbModalOptionsTelaCheia);
  }

  fecharModal(){
    this.modal.dismissAll();
  }

}
