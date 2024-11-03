import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Link } from 'lucide-angular';
import { DtoProperty } from '../../../interfaces/property/dto-property';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, CommonModule],
  templateUrl: './card.component.html'
})
export class CardComponent {
  readonly Link = Link;

  @Input() property !: DtoProperty;
}
