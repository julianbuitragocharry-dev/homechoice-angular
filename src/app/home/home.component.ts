import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/components/header/header.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
