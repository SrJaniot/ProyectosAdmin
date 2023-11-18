import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EsquemaService } from 'src/app/servicios/esquema.service';



@Component({
  selector: 'app-esquemas-lista',
  templateUrl: './esquemas-lista.component.html',
  styleUrls: ['./esquemas-lista.component.css']
})
export class EsquemasListaComponent {
  displayedColumns: string[] = ['id', 'nombre_esquema', 'usename'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private servicio: EsquemaService
  ) {

  }


  ngOnInit() {
    this.servicio.TraerEsquemas().subscribe(data => {
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
