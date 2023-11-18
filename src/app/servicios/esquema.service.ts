import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { Observable, observable } from 'rxjs';
import { RespuestaServer } from '../modelos/RespuestaServer';

@Injectable({
  providedIn: 'root'
})
export class EsquemaService {
  urlBase: string = ConfiguracionRutasBackend.urlbackend;

  constructor(
    private http: HttpClient,
    private toast: NgToastService

  ) {


   }

  /**
   * Traer departamentos para formulario combobox de registro esquema
   *  @return departamentos
   *
   */

  TraerDepartamentos() : Observable<RespuestaServer> {
    const datosUsuario = localStorage.getItem('datosUsuario')
    const datosUsuarioObjeto = JSON.parse(datosUsuario!);
    const token = datosUsuarioObjeto.token;
    return this.http.post(`${this.urlBase}obtener_departamentos`,
     { token: token,

    })
  }

  TraerMunicipios( ) : Observable<RespuestaServer> {
    const datosUsuario = localStorage.getItem('datosUsuario')
    const datosUsuarioObjeto = JSON.parse(datosUsuario!);
    const token = datosUsuarioObjeto.token;
    return this.http.post(`${this.urlBase}obtener_municipios`,
     { token: token,


    })
  }

  CrearEsquema( nombre_esquema:string , departamentos_id:string,municipios_id:string,
    nombre_administrador:string,apellidos_administrador:string,cedula_administrador:string,
    celular_administrador:string,telefono_administrador:string,email_administrador:string,
    genero_administrador:string,obs:string) : Observable<RespuestaServer> {
    const datosUsuario = localStorage.getItem('datosUsuario')
    const datosUsuarioObjeto = JSON.parse(datosUsuario!);
    const token = datosUsuarioObjeto.token;
    return this.http.post(`${this.urlBase}crear_esquema`,
     {
      token: token,
      nombre_esquema: nombre_esquema,
      departamentos_id: departamentos_id,
      municipios_id: municipios_id,
      nombre_administrador: nombre_administrador,
      apellidos_administrador: apellidos_administrador,
      cedula_administrador: cedula_administrador,
      celular_administrador: celular_administrador,
      telefono_administrador: telefono_administrador,
      email_administrador: email_administrador,
      genero_administrador: genero_administrador,
      obs: obs,
    })
  }











}
