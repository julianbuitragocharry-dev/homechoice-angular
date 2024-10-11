import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Link2 } from 'lucide-angular';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CardComponent, HeaderComponent, CommonModule, LucideAngularModule],
  templateUrl: './properties.component.html'
})
export class PropertiesComponent {
  readonly Search = Search;
  cards = Array(9).fill(0);
}
