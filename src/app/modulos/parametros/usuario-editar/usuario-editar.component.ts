import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {

  usuarioForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    telefono: new FormControl(''),
    celular: new FormControl(''),
    email: new FormControl(''),
    estado: new FormControl(''),
    obs: new FormControl(''),
    usuario: new FormControl(''),
    clave: new FormControl(''),
  });

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const elementId = this.route.snapshot.paramMap.get('id');
    // Carga los datos del elemento usando elementId
    console.log(elementId);
  }
}
