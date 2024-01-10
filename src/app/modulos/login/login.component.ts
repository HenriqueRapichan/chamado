import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequisicaoService } from '../../services/requisicao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public carregando: boolean = false;

  public usuarioForm = this.formBuilder.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required],
  });
  
  constructor(private formBuilder: FormBuilder,private requisicaoService: RequisicaoService,){
  }
  ngOnInit(): void {
    this.carregando = true;
  }

  login(){

  }
} 
