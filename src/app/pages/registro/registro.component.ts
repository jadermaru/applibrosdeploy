import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcessoService } from '../../services/acesso.service';
import { Router } from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Usuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  
    private aceesoService=inject(AcessoService)
    private router=inject(Router)
    public formBuild=inject(FormBuilder)
  
    public formRegistro:FormGroup=this.formBuild.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  
    registrarse(){
      if(this.formRegistro.invalid) return;

      const objeto:Usuario={
        username:this.formRegistro.value.username,
        password:this.formRegistro.value.password
      }

      this.aceesoService.registrarse(objeto).subscribe({
        next:(data)=>{
          if(data.token){
            localStorage.setItem("token",data.token)
            this.router.navigate([''])
          }
        },
        error: (error) => {
          if (error.status === 409) {
            alert('El nombre de usuario ya existe');
          } else if (error.status === 401) {
            const mensaje = error.error || 'No se pudo registrar';
            alert(mensaje);
          } 
          else {
            console.error('Error al iniciar sesión:', error);
            alert('Ocurrió un error inesperado al registrar sesión.');
          }
        }
      })

    }

    volver(){
      this.router.navigate([""])
    }
}
