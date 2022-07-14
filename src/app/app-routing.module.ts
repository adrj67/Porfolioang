import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {HomeAdminComponent} from './home-admin/home-admin.component';
import {SigninComponent} from './signin/signin.component';
import {ListadosComponent} from './listados/listados.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'home-admin',component:HomeAdminComponent},
  {path:'signin',component:SigninComponent},
  {path: 'listados',component:ListadosComponent,},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [],
})
export class AppRoutingModule { }
