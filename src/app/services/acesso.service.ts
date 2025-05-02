import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';
import { ResponseAcesso } from '../interfaces/ResponseAcesso';
import { ValidateTokenResponse } from '../interfaces/ValidateTokenResponse';
import { ResponseBook } from '../interfaces/ResponseBook';


@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  private http = inject(HttpClient)
  private baseUrl:string = appsetting.apiurl;
  constructor() { }

  registrarse(objeto: Usuario): Observable<ResponseAcesso> {
    return this.http.post<ResponseAcesso>(`${this.baseUrl}user`, objeto);
  }

  login(objeto: Usuario): Observable<ResponseAcesso> {
    return this.http.post<ResponseAcesso>(`${this.baseUrl}Token/login`, objeto);
  }

  validarToken(token: string): Observable<ValidateTokenResponse> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<ValidateTokenResponse>(
      `${this.baseUrl}Token/validate`,
      { headers }
    );
  }

  
}
