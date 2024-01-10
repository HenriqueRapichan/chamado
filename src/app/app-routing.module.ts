import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modulos/login/login.component';
import { HomeComponent } from './modulos/home/home.component';
import { ChamadosComponent } from './modulos/chamados/chamados.component';


const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'', component: ChamadosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
