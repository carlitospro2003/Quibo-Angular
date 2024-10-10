import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      return true;
    } else {
      // Si está autenticado, redirigimos al chat u otra ruta protegida
      return this.router.parseUrl('/chats');
    }
  }
}
