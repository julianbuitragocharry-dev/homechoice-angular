import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Link } from 'lucide-angular';
import { DtoProperty } from '../../../interfaces/property/dto-property';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, CommonModule, TranslateModule],
  templateUrl: './card.component.html'
})
export class CardComponent {
  readonly Link = Link;

  @Input() property !: DtoProperty;

  constructor(private translateService: TranslateService) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
  }
}
