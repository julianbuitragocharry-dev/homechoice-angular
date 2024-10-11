import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Link2 } from 'lucide-angular';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './card.component.html'
})
export class CardComponent {
  readonly Link2 = Link2;
}
