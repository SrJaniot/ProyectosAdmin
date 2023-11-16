import { Component,  OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { usuarioValidadoModel } from 'src/app/modelos/usuarioValidado.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {




  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router,
    private toast: NgToastService,
  ) { }
  sesionActiva: boolean = false;

  ngOnInit(): void {
    this.ValidarSesionActiva();

  }

  ValidarSesionActiva() {
    this.servicioSeguridad.ObteberDatosSesion().subscribe({
      next: (datos:usuarioValidadoModel) => {
        if (datos.token != "") {
          this.sesionActiva = true;

        }else{
          this.sesionActiva = false;

        }
        //console.log(datos);

      },
      error: (error:any) => {
        //console.log(error);
        this.sesionActiva = false;
      }
    });


  }


  CerrarSesion(){
    if (this.servicioSeguridad.CerrarSesion()){
    this.servicioSeguridad.CerrarSesion();
    this.router.navigate(['/inicio']);
    this.toast.success({detail:"Exito",summary:"Sesión Cerrada",duration:5000, position:'topCenter'});

    //alert("Sesion cerrada");

    }else{
      //alert("No hay sesion iniciada");
      this.toast.info({detail:"ERROR",summary:"No hay sesión iniciada",duration:5000, position:'topCenter'});
    }

  }

}
