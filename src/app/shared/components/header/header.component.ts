import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogIn, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly LogIn = LogIn;
}
