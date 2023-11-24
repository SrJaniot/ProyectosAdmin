import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { UsuarioeditarModel } from 'src/app/modelos/usuarioeditar';


@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit  {
  usuarioEditar: UsuarioeditarModel =new UsuarioeditarModel();
  fGroup: FormGroup= new FormGroup({});
    constructor(

      private fb: FormBuilder,
      private router: Router,
      private toast: NgToastService,
      private servicio: UsuariosService,
      private rutaActiva: ActivatedRoute



    ) { }

    ngOnInit(): void {
      this.construirformulario();
      this.BuscarRegistro();

    }

    BuscarRegistro(){
      const elementId = this.rutaActiva.snapshot.paramMap.get('id');
      console.log(elementId);
      this.servicio.TraerUsuarioPorId(elementId!).subscribe(response => {

        if (response.CODIGO === 1) {
          //console.log(response.DATOS);
          this.usuarioEditar = response.DATOS![0];
          this.obteberFormGroup['id'].setValue(this.usuarioEditar.id);
          this.obteberFormGroup['nombre_usuario'].setValue(this.usuarioEditar.usuario);
          this.obteberFormGroup['estado_id'].setValue(this.usuarioEditar.estado);
          this.obteberFormGroup['obs'].setValue(this.usuarioEditar.obs);
          this.obteberFormGroup['nombre_administrador'].setValue(this.usuarioEditar.nombre);
          this.obteberFormGroup['celular_administrador'].setValue(this.usuarioEditar.celular);
          this.obteberFormGroup['telefono_administrador'].setValue(this.usuarioEditar.telefono);
          this.obteberFormGroup['email_administrador'].setValue(this.usuarioEditar.email);
          //console.log(this.usuarioEditar);
          //console.log(this.usuarioEditar.id);
          //console.log(this.usuarioEditar.nombre);
          //console.log(this.usuarioEditar.telefono);
          //console.log(this.usuarioEditar.celular);
          //console.log(this.usuarioEditar.estado);
          //console.log(this.usuarioEditar.email);
          //console.log(this.usuarioEditar.obs);
          //console.log(this.usuarioEditar.usuario);
          //console.log(this.usuarioEditar.clave);
        }
      });
    }

    construirformulario() { // se crea el formulario
      this.fGroup = this.fb.group({
        id: ['',[Validators.required, ]],
        nombre_usuario: ['',[Validators.required, ]],
        estado_id: ['', [Validators.required,]],
        nombre_administrador: ['', [Validators.required,]],
        celular_administrador: ['', [Validators.required, this.onlyNumbers ]],
        telefono_administrador: ['', [ this.onlyNumbers ]],
        email_administrador: ['', [Validators.required, Validators.email,]],
        obs: ['', [Validators.required, ]],
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


    enviarformulario(){
      if(this.fGroup.invalid){
        this.toast.error({detail:"ERROR",summary:"Formulario invalido",duration:5000, position:'topCenter'});
      }else{
        let id = this.obteberFormGroup['id'].value;
        let nombre_usuario = this.obteberFormGroup['nombre_usuario'].value;
        let estado_id = this.obteberFormGroup['estado_id'].value;
        let nombre_administrador = this.obteberFormGroup['nombre_administrador'].value;
        let celular_administrador = this.obteberFormGroup['celular_administrador'].value;
        let telefono_administrador = this.obteberFormGroup['telefono_administrador'].value;
        let email_administrador = this.obteberFormGroup['email_administrador'].value;
        let obs = this.obteberFormGroup['obs'].value;
        console.log(id);
        console.log(nombre_usuario);
        console.log(estado_id);
        console.log(nombre_administrador);
        console.log(celular_administrador);
        console.log(telefono_administrador);
        console.log(email_administrador);
        console.log(obs);



        this.servicio.EditarUsuario(id, nombre_administrador, estado_id, telefono_administrador, celular_administrador, email_administrador, nombre_usuario, obs).subscribe({
          next: (datos) => {
            if(datos.CODIGO == 1){
              console.log(datos);
              this.toast.success({detail:"EXITO",summary:datos.MENSAJE,duration:5000, position:'topCenter'});
              this.router.navigate(['/parametros/listar-usuarios']);
            }else{
              console.log(datos);
              this.toast.error({detail:"ERROR",summary:datos.MENSAJE,duration:5000, position:'topCenter'});
            }
          },
          error: (error) => {
            console.log(error);
          }
        });

      }
    }















}
