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



  IdentificarUsuario(usuario: string, clave: string): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>( `${this.urlBase}iniciar_sesion_super_admin`, {
        usuario: usuario,
        clave: clave
      });


  }




}
