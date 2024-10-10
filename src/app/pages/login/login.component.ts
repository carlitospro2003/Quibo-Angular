import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'; // Usa HttpClient
import { FormsModule } from '@angular/forms'; // Para ngModel
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post('http://localhost:8000/api/auth/login', { email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Login exitoso', response);
          localStorage.setItem('token', response.token); // Guarda el token
          //localStorage.setItem('userId', response.user.id); // Guarda el ID del usuario
          //localStorage.setItem('userName', response.user.name); // Guarda el nombre del usuario
          console.log(response.token)
          this.router.navigate(['/chats']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
        }
      });
  }
}
