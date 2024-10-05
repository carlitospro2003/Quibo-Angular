import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChatsComponent } from './pages/chats/chats.component';

export const routes: Routes = [
    {
        path: "", component:LoginComponent
    },

    {
        path:"register", component:RegisterComponent
    },

    {
        path:"chats", component:ChatsComponent
    },
    
];