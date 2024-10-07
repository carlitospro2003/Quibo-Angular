import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Cambia HttpClient a HttpClientModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule para manejo de formularios
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule, // Cambia HttpClient por HttpClientModule
    FormsModule // Añadir FormsModule para ngModel
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post('http://localhost:3030/login', { email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Login exitoso', response);
          localStorage.setItem('token', response.token); // Guarda el token
          this.router.navigate(['/chats']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
        }
      });
  }
}
