import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  usuario:any = {};
  datos:any = [];
  dato:any = {id:'dato.id' ,fkIdUsuario:'usuario.id'};
  estudios:any = [];
  estudio:any = {id:'estudio.id' ,fkIdUsuario:'usuario.id'}; 
  trabajos:any = [];
  trabajo:any = {id:'trabajo.id' ,fkIdUsuario:'usuario.id'}; 
  crear:boolean = false;
  crearEst:boolean = false;
  crearTrab:boolean = false;
  loading:boolean = false;
  
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem ('usuario') || '{}');
    if(!this.usuario) {
      location.href = "/";
    }
    else {
      this.dato = {fkIdUsuario:this.usuario.id, datosList:[]};
      this.estudio = {fkIdUsuario:this.usuario.id,estudiosList:[]};
      this.trabajo = {fkIdUsuario:this.usuario.id,trabajosList:[]};
      this.buscarDatos();
      this.buscarEstudios();
      this.buscarTrabajos();
     }
  }

  logout(){
    localStorage.removeItem("usuario");
    location.href = "/";
  }

  listar(){
    this.router.navigate(['listados']);
  }
//***********************   DATOS  ******************************
  agregar(){
    this.crear = !this.crear;
  }

  buscarDatos(){
    this.loading = true;
    this.buscarDatosServicio().subscribe(
      (response:any)=>this.llenarDatos(response));
  }

  buscarDatosServicio():Observable<any>{
    return this.http.get<any>("https://app-porfoliospring.herokuapp.com/datos/buscar/usuario/fkIdUsuario" + this.usuario.id).pipe(
      catchError(e=>"Error home.component") 
    )
  }

  llenarDatos(datos:any){
    this.datos = datos;
    this.loading = false;
  }

  crearDato(){
    let formulario:any = document.getElementById("crear");
    let formularioValido:boolean = formulario.reportValidity();
    if(formularioValido){
      this.loading = true;
      this.datoServicio().subscribe(
        data => this.finalizarCrearDato(data)
      )
    }
  }

  datoServicio(){
    var httpOptions = {
      headers:new HttpHeaders ({'Content-Type':'application/json'})
    }
    return this.http.post<any> ("https://app-porfoliospring.herokuapp.com/datos/guardar", this.dato, httpOptions);
  }

  finalizarCrearDato(dato:any){
    if(dato){
      alert("Dato creado exitosamente.");
    }
    this.dato = {id: this.usuario.id,datosList:[]}
    this.crear = false;
    this.buscarDatos();
  }

  borrarDatos(id:any){
    alert("Se borrara el registro N° " + id );
    this.loading= true;
    for(let x=0;x<this.usuario.datosList.length;x++)
      if (this.usuario.datosList[x].id==id)
      {
        this.usuario.datosList.splice(x,1);
      }
    this.borrarDatosServicio(id).subscribe(data => this.buscarDatos());
    alert("Dato borrado exitosamente!"+ id );
    this.loading= false
  }

  borrarDatosServicio(id:any) {
    return this.http.delete("https://app-porfoliospring.herokuapp.com/datos/eliminar/"+id);
  }
//*********************    ESTUDIOS    *****************************
  agregarEstudios(){
    this.crearEst = !this.crearEst;
  }

  buscarEstudios(){
    this.loading = true;
    this.buscarEstudiosServicio().subscribe(
      (response:any)=>this.llenarEstudios(response));
  }

  buscarEstudiosServicio():Observable<any>{
    return this.http.get<any>("https://app-porfoliospring.herokuapp.com/estudios/buscarest/usuario/fkIdUsuario" + this.usuario.id).pipe(
      catchError(e=>"Error home.component") 
    )
  }

  llenarEstudios(estudios:any){
    this.estudios = estudios();
    this.loading = false;
  }

  crearEstudio(){
    let formulario:any = document.getElementById("crearEst");
    let formularioValido:boolean = formulario.reportValidity();
    if(formularioValido){
      this.loading = true;
      this.estudioServicio().subscribe(
        data => this.finalizarCrearEstudio(data)
      )
    }
  }

  estudioServicio(){
    var httpOptions = {
      headers:new HttpHeaders ({'Content-Type':'application/json'})
    }
    return this.http.post<any> ("https://app-porfoliospring.herokuapp.com/estudios/guardar", this.estudio, httpOptions);
  }

  finalizarCrearEstudio(estudio:any){
    if(estudio){
      alert("Estudio creado exitosamente.");
    }
    this.estudio = {id: this.usuario.id,estudiosList:[]}
    this.crearEst = false;
    this.buscarEstudios();
  }

  borrarEstudios(id:any){
    alert("Se borrara el registro N° " + id );
    this.loading= true;
    for(let x=0;x<this.usuario.estudiosList.length;x++)
      if (this.usuario.estudiosList[x].id==id)
      {
        this.usuario.estudiosList.splice(x,1);
      }
    this.borrarEstudiosServicio(id).subscribe(data => this.buscarEstudios());
    alert("Estudio borrado exitosamente!"+ id );
    this.loading= false
  }

  borrarEstudiosServicio(id:any) {
    return this.http.delete("https://app-porfoliospring.herokuapp.com/estudios/eliminar/"+id);
  }  
//*********************    TRABAJOS    *****************************
  agregarTrabajos(){
  this.crearTrab = !this.crearTrab;
  }

  buscarTrabajos(){
    this.loading = true;
    this.buscarTrabajosServicio().subscribe(
      (response:any)=>this.llenarTrabajos(response));
  }

  buscarTrabajosServicio():Observable<any>{
  return this.http.get<any>("https://app-porfoliospring.herokuapp.com/trabajos/buscar/usuario/fkIdUsuario" + this.usuario.id).pipe(
    catchError(e=>"Error home.component") 
  )
  }

  llenarTrabajos(trabajos:any){
    this.trabajos = trabajos;
    this.loading = false;
  }

  crearTrabajo(){
    let formulario:any = document.getElementById("crearTrab");
    let formularioValido:boolean = formulario.reportValidity();
    if(formularioValido){
      this.loading = true;
      this.trabajoServicio().subscribe(
        data => this.finalizarCrearTrabajo(data)
      )
    }
  }

  trabajoServicio(){
    var httpOptions = {
      headers:new HttpHeaders ({'Content-Type':'application/json'})
    }
    return this.http.post<any> ("https://app-porfoliospring.herokuapp.com/trabajos/guardar", this.trabajo, httpOptions);
  }

  finalizarCrearTrabajo(trabajo:any){
    if(trabajo){
      alert("Trabajo creado exitosamente.");
    }
    this.trabajo = {id: this.usuario.id,trabajosList:[]}
    this.crearTrab = false;
    this.buscarTrabajos();
  }

  borrarTrabajos(id:any){
    alert("Se borrara el registro N° " + id );
    this.loading= true;
    for(let x=0;x<this.usuario.trabajosList.length;x++)
      if (this.usuario.trabajosList[x].id==id)
      {
        this.usuario.trabajosList.splice(x,1);
      }
    this.borrarTrabajosServicio(id).subscribe(data => this.buscarTrabajos());
    alert("Trabajo borrado exitosamente!"+ id );
    this.loading= false
  }

  borrarTrabajosServicio(id:any) {
    return this.http.delete("https://app-porfoliospring.herokuapp.com/trabajos/eliminar/"+id);
  }

}