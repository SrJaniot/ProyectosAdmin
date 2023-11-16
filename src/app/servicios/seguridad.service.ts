import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { tokenModel } from '../modelos/token.model';
import { usuarioValidadoModel } from '../modelos/usuarioValidado.model';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase: string = ConfiguracionRutasBackend.urlbackend;

  constructor(
    private http: HttpClient,
    private toast: NgToastService



    ) {
      this.validacionDeSesion();
    }

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
   * @returns cierra la sesion del usuario booleano
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
      this.validacionDeSesion(); //actualiza el comportamiento del usuario es decir actualiza el observable "la barra de navegacion"
      //alert("Usuario identificado");
      return true;
    }

  }


  /**
   * Remueve los datos del usuario
   */


  RemoverDatosUsuarioIdentificado(){
    let datosUsuario=localStorage.getItem('datosUsuario');
    if(datosUsuario){
      localStorage.removeItem('datosUsuario');
    }
    this.ActualizarComportamientoUsuario(new usuarioValidadoModel());


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


  /**
   * Obtiene los datos de la sesion del usuario
   * @returns datos de la sesion del usuario
   */
  datosUsuarioValidado = new BehaviorSubject<usuarioValidadoModel>(new usuarioValidadoModel());

  ObteberDatosSesion(): Observable<usuarioValidadoModel> {

    return this.datosUsuarioValidado.asObservable();


}

validacionDeSesion(){
  let datosLS = localStorage.getItem('datosUsuario');
  if (datosLS) {
    let objUsuario= JSON.parse(datosLS);
    this.ActualizarComportamientoUsuario(objUsuario);
    return true;
  } else {
    return false;
  }
}

ActualizarComportamientoUsuario(datos:usuarioValidadoModel){
  //console.log(this.datosUsuarioValidado);
  return this.datosUsuarioValidado.next(datos);
}



}
