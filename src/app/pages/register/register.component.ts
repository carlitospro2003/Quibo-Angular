import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'; // Para hacer la petición HTTP
import { FormsModule } from '@angular/forms'; // Para usar ngModel
import { Router, RouterLink } from '@angular/router';
import {AuthService} from "../../service/auth.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    HttpClientModule,
    FormsModule // Agregar FormsModule para habilitar ngModel
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private apiUrl = environment.apiUrl;
  username: string = '';
  email: string = '';
  password: string = '';
  password_confirmation : string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    ) {}

  onRegister() {
    if (this.password !== this.password_confirmation ) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Hacer la petición POST al servidor para registrar al usuario
    this.http.post(`${this.apiUrl}/auth/register`, {
      name: this.username,
      email: this.email,
      password: this.password,
      password_confirmation : this.password_confirmation
    }).subscribe({
      next: (response: any) => {
        console.log('Registro exitoso', response);
        alert('Registro exitoso');
        this.router.navigate(['/']); // Redirigir al login
      },
      error: (error) => {
        console.error('Error al registrar', error);
        alert('Error al registrar');
      }
    });
  }
}
