import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})

export class ListadosComponent implements OnInit {

  usuario:any = {};
  datos:any = [];
  dato:any = {id:'dato.id' ,fkIdUsuario:'usuario.id'}; 
  crear:boolean = false;
  loading:boolean = false;
  
  constructor(private http:HttpClient, private router:Router) {}

  ngOnInit(): void {
    
    this.usuario = JSON.parse(localStorage.getItem ('usuario') || '{}');
    if(!this.usuario) {
      location.href = "/";
    }
    else {
      this.dato = {fkIdUsuario:this.usuario.id, datosList:[]};
      this.buscarDatos()
     }
  }

  logout(){
    localStorage.removeItem("usuario");
    location.href = "/";
  }

  buscarDatos(){
    this.loading = true;
    this.buscarDatosServicio().subscribe(
      (response:any)=>this.llenarDatos(response)
    );
  }

  buscarDatosServicio():Observable<any>{
    return this.http.get<any>("https://app-porfoliospring.herokuapp.com/datos/buscar/usuario/fkIdUsuario" + this.usuario.id).pipe(// this.usuario.id
      catchError(e=>"Error listados.component")
    )
  }

  llenarDatos(datos:any){
    this.datos = datos;
    this.loading = false;
  }

  deleteItem(id:any)
     {
      if(confirm('Seguro que desea eliminar el dato id ' + id)){
        this.borrarDatosServicio(id).subscribe(data =>
           {this.buscarDatos();
           },(error) => {
            console.log(error);
           })
      }
    }

  borrarDatosServicio (id:any) {
    return this.http.delete("https://app-porfoliospring.herokuapp.com/datos/eliminar/"+alert("borro base de datos"+ id )).pipe(
    catchError(e=>"Error listados.component") 
    );
  }

  volver(){
    history.go(-1)
  }

  displayStyle = "none";
  openPopup() {
      this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
