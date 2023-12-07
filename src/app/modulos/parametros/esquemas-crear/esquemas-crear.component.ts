import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EsquemaService } from 'src/app/servicios/esquema.service';

@Component({
  selector: 'app-esquemas-crear',
  templateUrl: './esquemas-crear.component.html',
  styleUrls: ['./esquemas-crear.component.css']
})
export class EsquemasCrearComponent {
  fGroup: FormGroup= new FormGroup({});
  departamentos: any[] = [];
  municipios: any[] = [];
  filtroMunicipios: any[] = [];
  selectedDepartamento: number | null = null;



    constructor(
      private esquemaService: EsquemaService,
      private fb: FormBuilder,
      private router: Router,
      private toast: NgToastService



    ) { }

    ngOnInit(): void {
      this.esquemaService.TraerDepartamentos().subscribe(response => {
        if (response.CODIGO === 1) {
          this.departamentos = response.DATOS!;
          //console.log(this.departamentos);
          //console.log(this.departamentos[0].id);
        }
      });
      this.esquemaService.TraerMunicipios().subscribe(response => {
        if (response.CODIGO === 1) {
          this.municipios = response.DATOS!;
          //console.log(this.municipios);
        }
      });
      this.construirformulario();

      //escuchar cambios en el select de departamentos
      this.fGroup.get('entidades_id')?.valueChanges.subscribe(id => {
        this.onDepartamentoChange(id);
      });



    }








    construirformulario() { // se crea el formulario
      this.fGroup = this.fb.group({

        nombre_esquema: ['',[Validators.required, ]],
        entidades_id: ['', [Validators.required,]],
        municipios_id: [''],
        nombre_administrador: ['', [Validators.required,]],
        apellidos_administrador: ['', [Validators.required,]],

        cedula_administrador: ['', [Validators.required, this.onlyNumbers ]],
        celular_administrador: ['', [Validators.required, this.onlyNumbers ]],
        telefono_administrador: ['' , [ this.onlyNumbers ]],
        email_administrador: ['', [Validators.required, Validators.email,]],
        genero_administrador: ['', [Validators.required,]],
        obs: [''],

      });
    }





    onDepartamentoChange(id: number | null): void {
      let idString = id?.toString();
      //console.log(idString);
      if (id !== null) {
        this.filtroMunicipios = this.municipios.filter(municipio => municipio.entidades_id === idString);;
      }
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
        let nombre_esquema = this.obteberFormGroup['nombre_esquema'].value;
        let departamentos_id = this.obteberFormGroup['entidades_id'].value;
        let municipios_id = this.obteberFormGroup['municipios_id'].value;
        let nombre_administrador = this.obteberFormGroup['nombre_administrador'].value;
        let apellidos_administrador = this.obteberFormGroup['apellidos_administrador'].value;
        let cedula_administrador = this.obteberFormGroup['cedula_administrador'].value;
        let celular_administrador = this.obteberFormGroup['celular_administrador'].value;
        let telefono_administrador = this.obteberFormGroup['telefono_administrador'].value;
        let email_administrador = this.obteberFormGroup['email_administrador'].value;
        let genero_administrador = this.obteberFormGroup['genero_administrador'].value;
        let obs = this.obteberFormGroup['obs'].value;
       // console.log(nombre_esquema);
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
        let nombreDepartamento= this.departamentos.find(departamento => departamento.id === departamentos_id)?.nombre;
        let nombreMunicipio='';
        let nombreEsquemaFinal='';
        if(municipios_id!=""){
          nombreMunicipio= this.filtroMunicipios.find(municipio => municipio.id === municipios_id)?.nombre;
          nombreEsquemaFinal=nombreDepartamento  + "_" + nombreMunicipio + "_" + nombre_esquema;

        }else
        {
          nombreEsquemaFinal=nombreDepartamento  + "_" + nombre_esquema;
        }
        //console.log(nombreEsquemaFinal);
        //quitar los espacios de nombreEsquemaFinal
        nombreEsquemaFinal=nombreEsquemaFinal.replace(/\s/g, '');
        //poner en minuscula nombreEsquemaFinal
        nombreEsquemaFinal=nombreEsquemaFinal.toLowerCase();

        //console.log(nombreEsquemaFinal);

        let entidades_id='';
        //preguntar si es departamento o municipio
        if (municipios_id != "" || null) {
           entidades_id = municipios_id;

        }else{
           entidades_id = departamentos_id;
        }

        //console.log(entidades_id);

        //llamado al servicio para crear el esquema
        this.esquemaService.CrearEsquema(nombreEsquemaFinal, entidades_id,
          nombre_administrador, apellidos_administrador, cedula_administrador,
          celular_administrador, telefono_administrador, email_administrador,
          genero_administrador, obs).subscribe({
            next: (datos) => {
              if (datos.CODIGO == 1) {
                //console.log(datos.MENSAJE);
                //alert(datos.MENSAJE);
                this.toast.success({detail:"EXITO",summary:datos.MENSAJE,duration:5000, position:'topCenter'});
                this.router.navigate(['']);
              } else {
                //console.log(datos.MENSAJE);
                //alert(datos.MENSAJE);
                this.toast.error({detail:"ERROR",summary:datos.MENSAJE,duration:5000, position:'topCenter'});
              }
            },
            error: (error) => {
              //console.log(error);
            }
          })

      }

    }


}
