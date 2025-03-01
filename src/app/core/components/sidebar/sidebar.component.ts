import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

interface NavItem {
  path: string;
  label: string;
  icon?: string;
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly navItems: NavItem[] = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/projects', label: 'PROJECTS' },
    { path: '/contact', label: 'CONTACT' },
  ];

  constructor(private router: Router) {}
}
