import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `
})
export class DashboardComponent {}
