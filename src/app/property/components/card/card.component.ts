import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Link } from 'lucide-angular';
import { DtoProperty } from '../../../interfaces/property/dto-property';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, CommonModule, TranslateModule],
  templateUrl: './card.component.html'
})
export class CardComponent {
  readonly Link = Link;

  @Input() property !: DtoProperty;

  constructor(private languageService: LanguageService) {
    const lang = this.languageService.getCurrentLanguage(); 
    this.languageService.setLanguage(lang);
  }
}
