import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  message: string = '';
  messages: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getMessages();
  }

  onSubmit() {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    const messageData = {
      userId: userId,
      userName: userName,
      content: this.message
    };

    this.http.post('http://localhost:8000/api/messages', messageData)
      .subscribe({
        next: (response: any) => {
          console.log('Mensaje enviado', response);
          this.message = '';
          this.getMessages(); // Actualiza la lista de mensajes
        },
        error: (error) => {
          console.error('Error al enviar el mensaje', error);
        }
      });
  }

  getMessages() {
    this.http.get('http://localhost:8000/api/message/get-messages')
      .subscribe({
        next: (response: any) => {
          this.messages = response;
        },
        error: (error) => {
          console.error('Error al obtener los mensajes', error);
        }
      });
  }
}

