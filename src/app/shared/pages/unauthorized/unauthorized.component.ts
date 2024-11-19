import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent {
  constructor(private languageService: LanguageService) {
    const lang = this.languageService.getCurrentLanguage(); 
    this.languageService.setLanguage(lang);
  }
}
