import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router, RouterLink} from '@angular/router';
import {RegisterUser} from '../interfaces/Register-user';
import {NgIf} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {


  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const user: RegisterUser = this.registerForm.value;

      this.userService.registerUser(user).subscribe({
        next: async (response: string) => {
          console.log('Registro exitoso:', response);
          try {
            await this.router.navigate(['/login']);
          } catch (error) {
            console.log('Error al navegar al login:', response);
          }
        },
        error: (error:HttpErrorResponse) => {
          console.error('Error en el registro:', error);
          if (error.error) {
            this.errorMessage = error.error.replace(/^({|})|(}|{)$/g, '');
          } else {
            this.errorMessage = 'Hubo un problema con el registro. Intenta nuevamente.';
          }
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }


  get formControls() {
    return this.registerForm.controls;
  }


}
