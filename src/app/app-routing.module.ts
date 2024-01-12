import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modulos/login/login.component';
import { HomeComponent } from './modulos/home/home.component';
import { ChamadosComponent } from './modulos/chamados/chamados.component';
import { CadClienteComponent } from './modulos/cadastros/cad-cliente/cad-cliente.component';
import { CadModuloComponent } from './modulos/cadastros/cad-modulo/cad-modulo.component';
import { CadParceiroComponent } from './modulos/cadastros/cad-parceiro/cad-parceiro.component';
import { CadSistemaComponent } from './modulos/cadastros/cad-sistema/cad-sistema.component';
import { CadStatusComponent } from './modulos/cadastros/cad-status/cad-status.component';
import { CadTipoDetalhamentoComponent } from './modulos/cadastros/cad-tipo-detalhamento/cad-tipo-detalhamento.component';
import { CadUsuarioComponent } from './modulos/cadastros/cad-usuario/cad-usuario.component';


// const routes: Routes = [
//   { path:'login', component: LoginComponent },
//   { path:'', component: ChamadosComponent },
// ];
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'chamados',
        component: ChamadosComponent,
      },
      {
        path: 'cliente',
        component: CadClienteComponent,
      },
      {
        path: 'modulo',
        component: CadModuloComponent,
      },
      {
        path: 'parceiro',
        component: CadParceiroComponent,
      },
      {
        path: 'sistema',
        component: CadSistemaComponent,
      },
      {
        path: 'status',
        component: CadStatusComponent,
      },
      {
        path: 'detalhamento',
        component: CadTipoDetalhamentoComponent,
      },
      {
        path: 'usuario',
        component: CadUsuarioComponent,
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
