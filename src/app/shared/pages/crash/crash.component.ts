import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-crash',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './crash.component.html'
})
export class CrashComponent {
  constructor(private translateService: TranslateService) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
  }
}
