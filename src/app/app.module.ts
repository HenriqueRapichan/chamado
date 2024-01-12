import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './modulos/login/login.component';
import { HomeComponent } from './modulos/home/home.component';
import { ChamadosComponent } from './modulos/chamados/chamados.component';
import { CadSistemaComponent } from './modulos/cadastros/cad-sistema/cad-sistema.component';
import { CadModuloComponent } from './modulos/cadastros/cad-modulo/cad-modulo.component';
import { CadClienteComponent } from './modulos/cadastros/cad-cliente/cad-cliente.component';
import { CadParceiroComponent } from './modulos/cadastros/cad-parceiro/cad-parceiro.component';
import { CadUsuarioComponent } from './modulos/cadastros/cad-usuario/cad-usuario.component';
import { CadTipoDetalhamentoComponent } from './modulos/cadastros/cad-tipo-detalhamento/cad-tipo-detalhamento.component';
import { CadStatusComponent } from './modulos/cadastros/cad-status/cad-status.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ChamadosComponent,
    CadSistemaComponent,
    CadModuloComponent,
    CadClienteComponent,
    CadParceiroComponent,
    CadUsuarioComponent,
    CadTipoDetalhamentoComponent,
    CadStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
