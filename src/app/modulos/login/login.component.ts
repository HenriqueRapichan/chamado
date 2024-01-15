import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequisicaoService } from '../../services/requisicao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  public carregando: boolean = false;
  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.reset();
  }

  reset(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public onSubmit(): void {
    if (this.loginForm && this.loginForm.valid) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');

      // Verifique novamente se os controles são não nulos antes de acessar as propriedades
      if (usernameControl && passwordControl) {
        const username = usernameControl.value;
        const password = passwordControl.value;

        console.log(username, password); 
    }
    }
    this.reset();
  }
} 
