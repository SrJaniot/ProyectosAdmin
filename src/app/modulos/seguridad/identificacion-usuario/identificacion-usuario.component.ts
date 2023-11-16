import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
//import { ToastrService } from 'ngx-toastr';
//import {NgToastService} from 'ng-angular-popup'



import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';








@Component({
  selector: 'app-identificacion-usuario',
  templateUrl: './identificacion-usuario.component.html',
  styleUrls: ['./identificacion-usuario.component.css']
})
export class IdentificacionUsuarioComponent implements OnInit {
  fGroup: FormGroup= new FormGroup({});


  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router,
    //private toastr: ToastrService
    private toast: NgToastService
  ) {

  }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fGroup = this.fb.group({
      usuario: ['',[Validators.required, ]],
      clave: ['', [Validators.required,]]

    });

  }

  IdentificarUsuario(){


    if(this.fGroup.invalid){
      this.toast.error({detail:"ERROR",summary:"Formulario invalido",duration:5000, position:'topCenter'});
      //alert("Formulario invalido");

    }else{
      let usuario = this.obteberFormGroup['usuario'].value;
      let clave = this.obteberFormGroup['clave'].value;
      this.servicioSeguridad.IdentificarUsuario(usuario, clave).subscribe({
        next: (datos:UsuarioModel) => {
          if(datos.CODIGO == 2){
            //console.log(datos.MENSAJE);
            //alert(datos.MENSAJE);
            this.toast.error({detail:"ERROR",summary:datos.MENSAJE,duration:5000, position:'topCenter'});

           // this.toastr.error(datos.MENSAJE, 'Error');
          }else if(this.servicioSeguridad.AlmacenarDatosUsuarioIdentificado(datos)){
            //console.log(localStorage.getItem('datosUsuario'));
            //alert(datos.MENSAJE);
            this.toast.success({detail:"EXITO",summary:"Sesión iniciada",duration:5000, position:'topCenter'});
            //this.router.navigate(['/inicio']);

          }
          console.log(datos);
        },
        error: (error) => {
          console.log(error);
        }
      })

    }

  }

  get obteberFormGroup(){
    return this.fGroup.controls;
  }

}
