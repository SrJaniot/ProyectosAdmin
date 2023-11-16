import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { tokenModel } from '../modelos/token.model';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase: string = ConfiguracionRutasBackend.urlbackend;

  constructor(
    private http: HttpClient,
    private toast: NgToastService


    ) { }

  /**
   * identificar usuario
   * @param usuario
   * @param clave
   * @returns datos del usuario validado
   */
  IdentificarUsuario(usuario: string, clave: string): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>( `${this.urlBase}iniciar_sesion_super_admin`, {
        usuario: usuario,
        clave: clave
      });
  }

  CerrarSessionpost(): Observable<tokenModel> {
    const datosUsuarioString = localStorage.getItem('datosUsuario');
    const datosUsuarioObjeto = JSON.parse(datosUsuarioString!);
    const token = datosUsuarioObjeto.token;


    //console.log(token);
    return this.http.post<tokenModel>( `${this.urlBase}cerrar_sesion_super_admin`, {
      token: token
      });
  }

  /**
   * CerrarSesion
   * @returns cierra la sesion del usuario
   */
  CerrarSesion(): boolean {
    let datosLS = localStorage.getItem('datosUsuario');
    if (datosLS) {
      this.CerrarSessionpost().subscribe({
        next: (datos:tokenModel) => {
          //console.log(datos);
          localStorage.removeItem('datosUsuario');
        },
        error: (error) => {
          console.log(error);
        }
      });

      //cerrar_sesion_super_admin
      //alert("Sesion cerrada");
      //this.toast.success({detail:"Exito",summary:"Sesion Cerrada",duration:5000, position:'topCenter'});

      return true;
    } else {
      //alert("No hay sesion iniciada");
      //this.toast.info({detail:"ERROR",summary:"No hay sesion iniciada",duration:5000, position:'topCenter'});
      return false;
    }
  }







  /**
   * Almacena los datos del usuario
   * @param datosUsuario datos del usuario
   */
  AlmacenarDatosUsuarioIdentificado(datosUsuario: UsuarioModel):boolean {
    let cadena =JSON.stringify(datosUsuario.DATOS);
    let datosLS= localStorage.getItem('datosUsuario');
    if (datosLS){
      this.toast.info({detail:"ERROR",summary:"Ya existe un usuario identificado",duration:5000, position:'topCenter'});
      //alert("Ya existe un usuario identificado");
      return false;

    }else{
      localStorage.setItem('datosUsuario', cadena);
      //alert("Usuario identificado");
      return true;
    }

  }

  /**
   *Opbtiene los datos del usuario almacenados en el local storage
   * @returns  datos del usuario almacenados en el local storage
   */
  ObteberDatosLocalStorage(): UsuarioModel | null{
    let datosLS = localStorage.getItem('datosUsuario');
    if (datosLS) {
      return JSON.parse(datosLS);
    } else {
      return null;
    }
  }







}
