import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { authGuard } from './services/auth.guard';
import {RegistroComponent} from './register/registro.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashBoardComponent, canActivate: [authGuard] },
    {  path: 'register', component: RegistroComponent}
];
