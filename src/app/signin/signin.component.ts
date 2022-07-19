import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
//import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  usuario:any = {nombre: '',clave: '',fkidrol:1}
  loading:boolean = false;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  crear(){
    let formulario:any = document.getElementById("crear");
    let formularioValido:boolean = formulario.reportValidity();
      if (formularioValido){
        this.loading = true;
        this.createService().subscribe(data => this.confirmar(data))
      }
  }
  
  confirmar(resultado:any){
    this.loading = false;
    if(resultado){
      alert("El usuario fue creado correctamente.")
      location.href = "";
    }
    else{
      alert("Error al crear el usuario.")
    }
  }

  createService(){
    var httpOptions = {
      headers:new HttpHeaders ({'Content-Type':'application/json'})
    }
    return this.http.post<any> ("https://app-porfoliospring.herokuapp.com/usuario/guardar", this.usuario, httpOptions);
  }

  regresar(){
    location.href = "/";
  }
}
