import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router,
    private toast: NgToastService
  ) {

   }

  ngOnInit(): void {
    this.cerrarSesion();
  }


  cerrarSesion(){
    this.servicioSeguridad.RemoverDatosUsuarioIdentificado();
    this.router.navigate(['']);
    this.toast.success({detail:"Sesion cerrada",summary:"Sesion cerrada",duration:5000, position:'topCenter'});

  }

}
