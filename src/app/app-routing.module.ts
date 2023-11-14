import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './publico/inicio/inicio.component';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';

const routes: Routes = [
  {
    path:'inicio',
    component : InicioComponent
  },
  {
    path:'',
    redirectTo:'/inicio',
    pathMatch:'full'
  },
  {
    path:'seguridad',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then(modulo => modulo.SeguridadModule)
  },










  // Ruta no encontrada tien que ser el elultimo
  {
    path:'**',
    component: RutaNoEncontradaComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
