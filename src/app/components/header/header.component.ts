import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // Update button accessibility
    const button = document.querySelector('.mobile-nav-toggle') as HTMLElement;
    if (button) {
      button.setAttribute('aria-expanded', String(this.isMenuOpen));
    }
  }

}
