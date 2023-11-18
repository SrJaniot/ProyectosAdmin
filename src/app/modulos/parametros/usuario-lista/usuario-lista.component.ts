import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosService } from 'src/app/servicios/usuarios.service';



@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent {
  displayedColumns: string[] = ['id','nombre','telefono','celular','email','estado','obs','usuario','clave' ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private servicio: UsuariosService
  ) {

  }


  ngOnInit() {
    this.servicio.TraerUsuario().subscribe(data => {
      if (data.CODIGO === 1) {
        console.log(data.DATOS);
        this.dataSource = new MatTableDataSource(data.DATOS);
        this.dataSource.paginator = this.paginator;

      }
    });
  }




  dataSource = new MatTableDataSource<{id: string, nombre_esquema: string,usename:string }[]>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
