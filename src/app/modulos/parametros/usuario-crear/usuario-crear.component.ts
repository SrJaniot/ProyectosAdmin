import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
//importar servicio de usuarios
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})
export class UsuarioCrearComponent {
  fGroup: FormGroup= new FormGroup({});




    constructor(

      private fb: FormBuilder,
      private router: Router,
      private toast: NgToastService,
      private servicio: UsuariosService



    ) { }

    ngOnInit(): void {

      this.construirformulario();

    }








    construirformulario() { // se crea el formulario
      this.fGroup = this.fb.group({

        nombre_usuario: ['',[Validators.required, ]],
        contraseña: ['', [Validators.required,]],
        estado_id: ['', [Validators.required,]],
        nombre_administrador: ['', [Validators.required,]],
        celular_administrador: ['', [Validators.required, this.onlyNumbers ]],
        telefono_administrador: ['' , [ this.onlyNumbers ]],
        email_administrador: ['', [Validators.required, Validators.email,]],
        obs: ['', [Validators.required,]],

      });
    }










    get obteberFormGroup() {
      return this.fGroup.controls;
    }

    //nuevo controlador de formulario para que solo acepte numeros

    onlyNumbers(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      if (isNaN(value)) {
        return { onlyNumbers: true };
      }
      return null;
    }






    EnviarFormulario(){
      if(this.fGroup.invalid){
        this.toast.error({detail:"ERROR",summary:"Formulario invalido",duration:5000, position:'topCenter'});
        //alert("Formulario invalido");

      }else{
        let nombre_usuario = this.obteberFormGroup['nombre_usuario'].value;
        let contraseña = this.obteberFormGroup['contraseña'].value;
        let estado_id = this.obteberFormGroup['estado_id'].value;
        let nombre_administrador = this.obteberFormGroup['nombre_administrador'].value;
        let celular_administrador = this.obteberFormGroup['celular_administrador'].value;
        let telefono_administrador = this.obteberFormGroup['telefono_administrador'].value;
        let email_administrador = this.obteberFormGroup['email_administrador'].value;
        let obs = this.obteberFormGroup['obs'].value;
        //console.log(nombre_esquema);
        //console.log( departamentos_id);
        //console.log( municipios_id);
        //console.log(nombre_administrador);
        //console.log(apellidos_administrador);
        //console.log(cedula_administrador);
        //console.log(celular_administrador);
        //console.log(telefono_administrador);
        //console.log(email_administrador);
        //console.log(genero_administrador);
        //console.log(obs);


        //llamado al servicio para crear el usuario
        this.servicio.CrearUsuario(nombre_administrador,telefono_administrador,celular_administrador,estado_id,email_administrador,nombre_usuario,contraseña,obs).subscribe({
          next: (datos: any) => {
            if (datos.CODIGO === 1) {
              //console.log(datos);
              this.toast.success({detail:"Exito",summary:"Usuario creado",duration:5000, position:'topCenter'});
              //alert("Usuario creado");
              this.router.navigate(['/parametros/listar-usuarios']);
            } else {
              //console.log(datos);
              this.toast.error({detail:"ERROR",summary:"Error al crear usuario",duration:5000, position:'topCenter'});
              //alert("Error al crear usuario");
            }
          },
          error: (error: any) => {
            //console.log(error);
            this.toast.error({detail:"ERROR",summary:"Error al crear usuario",duration:5000, position:'topCenter'});
            //alert("Error al crear usuario");
          }
        });



      }

    }



}
