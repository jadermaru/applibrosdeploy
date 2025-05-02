import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AcessoService } from '../services/acesso.service';
import { map, catchError, of, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const acessoService = inject(AcessoService);

  if (!token) {
    router.navigate(['']);
    return false;
  }

  return acessoService.validarToken(token).pipe(
    map(resp => {
      if (resp.valid) {
        return true;
      } else {
        router.navigate(['']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['']);
      return of(false);
    })
  ) as Observable<boolean>;
};
