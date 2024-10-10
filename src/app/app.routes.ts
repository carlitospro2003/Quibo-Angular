import { Routes } from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChatsComponent } from './pages/chats/chats.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guess.guard';


export const routes: Routes = [
    //Rutas publicas
    { path: "", component:LoginComponent, canActivate: [GuestGuard] },
    { path:"register", component:RegisterComponent, canActivate: [GuestGuard] },

    // Rutas protegidas
    { path: 'chats', component: ChatsComponent, canActivate: [AuthGuard] },

    // Ruta wildcard para rutas no encontradas
    { path: '**', redirectTo: '/' }
];
