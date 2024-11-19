import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-crash',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './crash.component.html'
})
export class CrashComponent {
  constructor(private languageService: LanguageService) {
    const lang = this.languageService.getCurrentLanguage(); 
    this.languageService.setLanguage(lang);
  }
}
