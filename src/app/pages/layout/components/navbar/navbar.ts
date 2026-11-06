import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../../../../core/models/auth.interface';
import { ExtractPipe } from '../../../shared/pipes/extract-pipe';


@Component({
  imports: [ExtractPipe],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  private router = inject(Router);
  incidentUserData=input.required<UserInterface>();
  menuClick=output<void>()
  onLogout() {
    localStorage.removeItem('incidentUser');
    this.router.navigate(['login']);

  }
}
