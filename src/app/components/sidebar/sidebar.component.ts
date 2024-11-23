import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router) {
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
