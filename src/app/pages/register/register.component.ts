import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'; // Para hacer la petición HTTP
import { FormsModule } from '@angular/forms'; // Para usar ngModel
import { Router, RouterLink } from '@angular/router';

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
  username: string = '';
  email: string = '';
  password: string = '';
  cpassword : string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    if (this.password !== this.cpassword ) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Hacer la petición POST al servidor para registrar al usuario
    this.http.post('http://localhost:3030/register', {
      username: this.username,
      email: this.email,
      password: this.password,
      cpassword : this.cpassword
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
