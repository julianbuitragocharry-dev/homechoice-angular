import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hello.component.html'
})
export class HelloComponent {
  nombre: string;

  constructor(private languageService: LanguageService) {
    const lang = this.languageService.getCurrentLanguage(); 
    this.languageService.setLanguage(lang);

    this.nombre = localStorage.getItem('user') || 'Hello World';
  }
}
