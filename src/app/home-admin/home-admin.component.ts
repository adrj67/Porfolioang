import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})

export class HomeAdminComponent implements OnInit {
  usuario:any = {nombre:'admin',clave:'admin'};//se que esto esta mal...
  usuarios:any =[];
  errorInicio:boolean = false;
  loading:boolean = false;
    
  constructor(private http:HttpClient,private router:Router) { }
  
  ngOnInit(): void {  }

  ver8(){
    let formulario:any = document.getElementById("ver8") ;
    let formularioValido:boolean = formulario.reportValidity();
    if (formularioValido){
      this.loading = true;
      this.loginService().subscribe(
        data => this.iniciarSesion(data)
      );
    }
  }

  iniciarSesion(resultado:any){
    this.loading = false;
    if(resultado){
      localStorage.setItem("usuario",JSON.stringify(resultado));
      if (resultado.fkidrol == 2){
        location.href = "/listados";
      }else{
      location.href = "/home";}
    }
    else{
      this.errorInicio = true;
    }
  }

  loginService(){
    var httpOptions = {
      headers:new HttpHeaders ({'Content-Type':'application/json'})
    }
    return this.http.post<any> ("http://localhost:8080/usuario/login", this.usuario, httpOptions);
  }

  logout(){
    localStorage.removeItem("usuario");
    location.href = "/";
  }
}

