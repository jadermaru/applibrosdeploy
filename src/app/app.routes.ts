import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { authGuard } from './Custom/auth.guard';
import { BookDetailComponent } from './pages/bookDetail/bookDetail.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"registro",component:RegistroComponent},
    {path:"inicio",component:InicioComponent,canActivate:[authGuard]},
    {path:"book/:id",component:BookDetailComponent,canActivate:[authGuard]},
];
