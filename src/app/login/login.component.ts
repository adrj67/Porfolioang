import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorInicio:boolean = false;
  loading:boolean = false;
  usuario:any = {};
 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(){
    let formulario:any = document.getElementById("login");
    let formularioValido:boolean = formulario.reportValidity();
    if (formularioValido){
      this.loading = true;
      this.loginService().subscribe(
        data => this.iniciarSesion(data)
      )
    }
  }

  iniciarSesion(resultado:any){
    this.loading = false;
    if(resultado){
      localStorage.setItem("usuario",JSON.stringify(resultado));
      
      if (resultado.fkidrol == 1){
        location.href = "/home-admin";
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
    return this.http.post<any> ("https://app-porfoliospring.herokuapp.com/usuario/login", this.usuario, httpOptions);
  }
  
  crearCuenta(){
    location.href="/signin";
  }
}
