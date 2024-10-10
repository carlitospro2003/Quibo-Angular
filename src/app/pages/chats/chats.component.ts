import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    NgForOf
  ],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  message: string = '';
  messages: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  intervalId: any;

  ngOnInit() {
    this.getMessages();
    this.intervalId = setInterval(() => {
      this.getMessages();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }




  onSubmit() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const messageData = {
      message: this.message
    };

    this.http.post('http://localhost:8000/api/message/post-message', messageData, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Mensaje enviado', response);
          this.message = '';
          this.getMessages();
        },
        error: (error) => {
          console.error('Error al enviar el mensaje', error);
        }
      });
  }

  getMessages() {
    let token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:8000/api/message/get-messages', { headers })
      .subscribe({
        next: (response: any) => {
          if (response.result) {
            this.messages = response.data.sort((a: { fecha: string | number | Date; }, b: { fecha: string | number | Date; }) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
            this.scrollToBottom();
            console.log(response.data);
            //Borrar en caso de error
            //Borrar la consola por las multiples peticiones
            console.clear()
          } else {
            console.log("error msg");
            alert("Error al recibir mensajes");
          }
        },
        error: (error) => {
          console.error('Error al obtener los mensajes', error);
          if (error.status === 401) {
            // Token inválido o expirado
            alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
            this.logout();
          }
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/']);
  }

  scrollToBottom() {
    try {
      const messagesContainer = document.getElementById('messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    } catch(err) { }
  }
}
