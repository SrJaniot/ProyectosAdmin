import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { EsquemasListaComponent } from './esquemas-lista/esquemas-lista.component';
import { EsquemasCrearComponent } from './esquemas-crear/esquemas-crear.component';
import { EsquemasEditarComponent } from './esquemas-editar/esquemas-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EsquemasListaComponent,
    EsquemasCrearComponent,
    EsquemasEditarComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class ParametrosModule { }
