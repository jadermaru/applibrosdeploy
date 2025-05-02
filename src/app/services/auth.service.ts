import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Método para obtener el token desde el localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para obtener el ID del usuario desde el token
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token); // Decodifica el token usando la librería
        // El userId debe estar en el claim 'nameidentifier' según la implementación en el backend
        return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
      } catch (error) {
        console.error('Error al decodificar el token', error);
        return null;
      }
    }
    return null;
  }
  
  logout(): void {
    localStorage.removeItem('token');  // Elimina el token del localStorage
    // Puedes agregar más lógica si necesitas limpiar otros datos de sesión.
  }
  
}
