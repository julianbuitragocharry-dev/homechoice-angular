import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './notfound.component.html'
})
export class NotfoundComponent {
  constructor(private translateService: TranslateService) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
  }
}
