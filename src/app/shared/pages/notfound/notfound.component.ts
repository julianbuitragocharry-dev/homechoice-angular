import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './notfound.component.html'
})
export class NotfoundComponent {
  constructor(private languageService: LanguageService) {
    const lang = this.languageService.getCurrentLanguage(); 
    this.languageService.setLanguage(lang);
  }
}
