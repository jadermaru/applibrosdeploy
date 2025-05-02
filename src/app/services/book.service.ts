import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting }    from '../settings/appsettings';
import { ResponseBook }  from '../interfaces/ResponseBook';
import { Observable }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http    = inject(HttpClient);
  private baseUrl = appsetting.apiurl;

  constructor() { }

  // Lista todos los libros
  lista(): Observable<ResponseBook[]> {
    return this.http.get<ResponseBook[]>(`${this.baseUrl}Book/Books`);
  }

  // Obtiene un libro por su id
  getBook(id: number): Observable<ResponseBook> {
    return this.http.get<ResponseBook>(`${this.baseUrl}Book/Books/${id}`);
  }
}
