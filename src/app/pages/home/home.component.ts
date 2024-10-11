import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { LucideAngularModule, FileIcon } from "lucide-angular";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, LucideAngularModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  readonly FileIcon = FileIcon;
}
