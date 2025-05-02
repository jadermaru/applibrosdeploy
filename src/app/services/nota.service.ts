import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaDTO } from '../interfaces/Nota';
import { appsetting } from '../settings/appsettings';
import { CreateNota } from '../interfaces/CreateNota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private baseUrl = appsetting.apiurl;

  constructor(private http: HttpClient) {}

  // Obtener todas las notas de un libro por su ID
  getNotasPorLibro(bookId: number): Observable<NotaDTO[]> {
    return this.http.get<NotaDTO[]>(`${this.baseUrl}Nota/libro/${bookId}`);
  }

  crearNota(nota: CreateNota): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}Nota`, nota);
  }
}
