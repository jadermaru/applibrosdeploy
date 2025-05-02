import { Component, inject } from '@angular/core';
import { AcessoService } from '../../services/acesso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Usuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private aceesoService=inject(AcessoService)
  private router=inject(Router)
  public formBuild=inject(FormBuilder)

  public formlogin:FormGroup=this.formBuild.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })

  iniciarSesion(){
    if(this.formlogin.invalid)return;
     
    const objeto:Usuario={
      username:this.formlogin.value.username,
      password:this.formlogin.value.password,
    }

    this.aceesoService.login(objeto).subscribe({
      next:(data)=>{
        if(data.token){
          localStorage.setItem("token",data.token)
          this.router.navigate(['inicio'])
        }
      },
      error: (error) => {
        if (error.status === 401) {
          const mensaje = error.error || 'Credenciales inválidas.';
          alert(mensaje);
        } else {
          console.error('Error al iniciar sesión:', error);
          alert('Ocurrió un error inesperado al iniciar sesión.');
        }
      }
    })
  }
  
  registrarse(){
    this.router.navigate(['registro'])
  }
}
