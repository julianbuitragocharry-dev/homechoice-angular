import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/components/header/header.component";
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent, TranslateModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private languageService: LanguageService) {
    const lang = this.languageService.getCurrentLanguage(); 
    this.languageService.setLanguage(lang);
  }
}
