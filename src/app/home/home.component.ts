import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/components/header/header.component";
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent, TranslateModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private translateService: TranslateService) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
  }
}
