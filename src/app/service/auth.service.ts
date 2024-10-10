import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    //Hay un token en el localStorage
    return !!localStorage.getItem('token');
  }
  //Cerrar sesion
  logout(): void {
    localStorage.clear();
  }
}
