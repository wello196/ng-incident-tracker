import { Component, signal } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { UserInterface } from '../../core/models/auth.interface';

@Component({
  imports: [Sidebar, Navbar, RouterOutlet],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  isSideBarOpen = signal<boolean>(false);
  toggleSidebar() {
    this.isSideBarOpen.set(!this.isSideBarOpen());
  }
  incidentUserData = signal<UserInterface>(JSON.parse(localStorage.getItem('incidentUser') || '{}'));
}
