import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { Observable, observable } from 'rxjs';
import { RespuestaServer } from '../modelos/RespuestaServer';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private urlBase: string = ConfiguracionRutasBackend.urlbackend;


  constructor(
    private http: HttpClient,
    private toast: NgToastService
  ) {

  }

  CrearUsuario( nombre_administrador :string , telefono_administrador:string, celular_administrador:string,
    estado_id:string,email_administrador:string, nombre_usuario:string, contraseña:string, obs:string) : Observable<RespuestaServer> {
    const datosUsuario = localStorage.getItem('datosUsuario')
    const datosUsuarioObjeto = JSON.parse(datosUsuario!);
    const token = datosUsuarioObjeto.token;
    return this.http.post(`${this.urlBase}crear_usuario`,
     {
      token: token,
      nombre: nombre_administrador,
      telefono: telefono_administrador,
      celular: celular_administrador,
      estado: estado_id,
      email: email_administrador,
      usuario: nombre_usuario,
      clave: contraseña,
      obs: obs,

    })
  }

  // TraerUsuario() : Observable<RespuestaServer> {

  TraerUsuario() : Observable<RespuestaServer> {
    const datosUsuario = localStorage.getItem('datosUsuario')
    const datosUsuarioObjeto = JSON.parse(datosUsuario!);
    const token = datosUsuarioObjeto.token;
    return this.http.post(`${this.urlBase}obtener_usuarios`,
     {
      token: token,
     });

    }


  TraerUsuarioPorId(id:string) : Observable<RespuestaServer> {
    const datosUsuario = localStorage.getItem('datosUsuario')
    const datosUsuarioObjeto = JSON.parse(datosUsuario!);
    const token = datosUsuarioObjeto.token;
    return this.http.post(`${this.urlBase}obtener_usuarios`,
     {
      token: token,
      id: id,
     });

    }

    EditarUsuario(id:string, nombre_administrador :string ,estado_id:string, telefono_administrador:string, celular_administrador:string,
      email_administrador:string, nombre_usuario:string, obs:string) : Observable<RespuestaServer> {
      const datosUsuario = localStorage.getItem('datosUsuario')
      const datosUsuarioObjeto = JSON.parse(datosUsuario!);
      const token = datosUsuarioObjeto.token;
      return this.http.post(`${this.urlBase}editar_usuario`,
       {
        token: token,
        id: id,
        nombre: nombre_administrador,
        telefono: telefono_administrador,
        celular: celular_administrador,
        estado: estado_id,
        email: email_administrador,
        usuario: nombre_usuario,
        clave: "",
        obs: obs,
      })
    }
















}
