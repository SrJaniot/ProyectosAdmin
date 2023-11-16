import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsquemasListaComponent } from './esquemas-lista/esquemas-lista.component';
import { EsquemasCrearComponent } from './esquemas-crear/esquemas-crear.component';
import { EsquemasEditarComponent } from './esquemas-editar/esquemas-editar.component';

const routes: Routes = [
  {
    path: 'listar-esquemas',
    component: EsquemasListaComponent
  },
  {
    path: 'crear-esquemas',
    component: EsquemasCrearComponent
  },
  {
    path: 'editar-esquemas',
    component: EsquemasEditarComponent
  }







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
