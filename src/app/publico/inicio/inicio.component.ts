import { Component, OnInit } from '@angular/core';
import { usuarioValidadoModel } from 'src/app/modelos/usuarioValidado.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  sesionActiva: boolean = false;

  constructor(
    private servicioSeguridad: SeguridadService,
  ) {
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

  ngOnInit(): void {
  }

}
