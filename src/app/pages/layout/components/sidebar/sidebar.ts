import { Component, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserInterface } from '../../../../core/models/auth.interface';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {

  incidentUserData=input.required<UserInterface>();
  isSidebarOpen = input.required<boolean>();
  closeSidebar=output<void>();
}
