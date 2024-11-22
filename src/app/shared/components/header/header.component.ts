import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LogIn, LucideAngularModule } from 'lucide-angular';
import { LanguageService } from '../../../service/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, TranslateModule, CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly LogIn = LogIn;
  isDropwdownOpen = false;
  currentLanguage = 'es';
  languages = ['es', 'en', 'fr'];

  constructor(private languageService: LanguageService) {
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
}
