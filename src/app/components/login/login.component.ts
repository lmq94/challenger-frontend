import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async onLogin() {
    console.log(this.email);
    console.log(this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: async (response: string) => {
        console.log('Login exitoso. Token recibido:', response);
        localStorage.setItem('token', response);

        try {
          await this.router.navigate(['/dashboard']);
          console.log('Navegación al dashboard exitosa.');
        } catch (error) {
          console.error('Error al navegar al dashboard:', error);
        }
      },
      error: (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = "Contraseña o usuario incorrectos.";
      }

    });
  }

}
