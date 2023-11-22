import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsquemasListaComponent } from './esquemas-lista/esquemas-lista.component';
import { EsquemasCrearComponent } from './esquemas-crear/esquemas-crear.component';
import { EsquemasEditarComponent } from './esquemas-editar/esquemas-editar.component';
import { UsuarioCrearComponent } from './usuario-crear/usuario-crear.component';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';

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
  },
  {
    path:'crear-usuarios',
    component: UsuarioCrearComponent
  },
  {
    path:'listar-usuarios',
    component: UsuarioListaComponent
  },
  {
    path:'editar-usuarios/:id',
    component: UsuarioEditarComponent
  }









];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
