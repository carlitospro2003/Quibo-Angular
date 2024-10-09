import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { HttpClientModule, HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    FormsModule

  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {
  message: string ='';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post('http://localhost:8000/api/auth/message',{message : this.message})
      .subscribe()
    console.log('Pase?????')
  }
}

const getUsername = async () => {
  let username = localStorage.getItem('username');
  while (!username) {
    username = prompt('Please enter your username');
    if (username) {
      localStorage.setItem('username', username);
    } else {
      alert('Username cannot be empty. Please enter a valid username.');
    }
  }
  return username;
};
