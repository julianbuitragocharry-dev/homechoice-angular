import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { HasRoleDirective } from '../../../directives/has-role.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, HasRoleDirective, TranslateModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isOpen = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private translateService: TranslateService
  ) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
