import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase: string = ConfiguracionRutasBackend.urlbackend;

  constructor(private http: HttpClient) { }

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

  /**
   * CerrarSesion
   * @returns cierra la sesion del usuario
   */
  CerrarSesion(): boolean {
    let datosLS = localStorage.getItem('datosUsuario');
    if (datosLS) {
      localStorage.removeItem('datosUsuario');
      //alert("Sesion cerrada");
      return true;
    } else {
      //alert("No hay sesion iniciada");
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
      alert("Ya existe un usuario identificado");
      return false;

    }else{
      localStorage.setItem('datosUsuario', cadena);
      alert("Usuario identificado");
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
