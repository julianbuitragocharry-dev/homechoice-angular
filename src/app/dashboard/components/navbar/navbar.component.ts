import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { HasRoleDirective } from '../../../directives/has-role.directive';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, HasRoleDirective, TranslateModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isOpen = false;
  isDropwdownOpen = false;
  currentLanguage = 'es';
  languages = ['es', 'en', 'fr'];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private languageService: LanguageService
  ) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  toggleDropdown() {
    this.isDropwdownOpen = !this.isDropwdownOpen;
  }

  changeLenguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.isDropwdownOpen = !this.isDropwdownOpen;
    this.currentLanguage = lang;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
