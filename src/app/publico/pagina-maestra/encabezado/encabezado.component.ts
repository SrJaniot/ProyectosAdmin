import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }


  CerrarSesion(){
    if (this.servicioSeguridad.CerrarSesion()){
    this.servicioSeguridad.CerrarSesion();
    alert("Sesion cerrada");
    this.router.navigate(['/inicio']);
    }else{
      alert("No hay sesion iniciada");
    }

  }

}
