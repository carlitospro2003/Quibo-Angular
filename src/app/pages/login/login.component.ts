import { Component } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from "../../service/auth.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private apiUrl = environment.apiUrl;
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }

  onSubmit() {
    this.http.post(`${this.apiUrl}/auth/login`, { email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Login exitoso', response);
          const token = response.access_token;
          localStorage.setItem('token', token); //Guardar el token en localStorage

          //Solicitud GET para obtener los datos del usuario
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

          this.http.get(`${this.apiUrl}/user/me`, { headers })
            .subscribe({
              next: (userData: any) => {
                console.log('Datos del usuario', userData);
                //Guardar los datos del usuario en localStorage
                localStorage.setItem('userId', userData.id);
                localStorage.setItem('userName', userData.name);
                localStorage.setItem('userEmail', userData.email);
                //Guardar otros datos si son necesarios

                this.router.navigate(['/chats']);
              },
              error: (error) => {
                console.error('Error al obtener los datos del usuario', error);
              }
            });
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
          alert("Email o contraseña incorrectos")
        }
      });
  }
}
