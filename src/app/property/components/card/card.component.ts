import { Component, Input } from '@angular/core';
import { DtoProperties } from '../../../interfaces/dto-properties';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Link } from 'lucide-angular';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './card.component.html'
})
export class CardComponent {
  readonly Link = Link;

  @Input() property !: DtoProperties;
}
