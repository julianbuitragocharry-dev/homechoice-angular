import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hello.component.html'
})
export class HelloComponent {
  nombre: string;

  constructor(private translateService: TranslateService) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);

    this.nombre = localStorage.getItem('user') || 'Hello World';
  }
}
