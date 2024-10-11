import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, User } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly User = User;
}
