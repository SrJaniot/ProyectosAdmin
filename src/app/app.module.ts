import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './publico/pagina-maestra/encabezado/encabezado.component';
import { PiePaginaComponent } from './publico/pagina-maestra/pie-pagina/pie-pagina.component';
import { MenuLateralComponent } from './publico/pagina-maestra/menu-lateral/menu-lateral.component';
import {RutaNoEncontradaComponent}from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';
import {ErrorDeServidorComponent} from './publico/errores/error-de-servidor/error-de-servidor.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
//import { NgToastModule } from 'ng-angular-popup'; este es el modulo de popup  npm install ng-angular-popup  https://letsprogram.in/blog/647990c15960050b58aca375
//import { NgToastModule } from 'ng-angular-popup';
//import {ToastrModule} from 'ngx-toastr'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    MenuLateralComponent,
    RutaNoEncontradaComponent,
    ErrorDeServidorComponent,
    InicioComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgToastModule,
    //ToastrModule
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

