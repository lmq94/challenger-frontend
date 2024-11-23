import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { authGuard } from './guards/auth.guard';
import {RegistroComponent} from './components/register/registro.component';
import {publicGuard} from "./guards/public.guard";

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [publicGuard] },
    { path: 'dashboard', component: DashBoardComponent, canActivate: [authGuard] },
    {  path: 'register', component: RegistroComponent, canActivate: [publicGuard]}
];
