import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { CardComponent } from "../../components/card/card.component";
import { PropertyService } from '../../../service/property.service';
import { DtoProperty } from '../../../interfaces/dto-property';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDown, Search } from 'lucide-angular';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [HeaderComponent, CardComponent, CommonModule, LucideAngularModule],
  templateUrl: './properties.component.html'
})
export class PropertiesComponent implements OnInit {
  readonly ChevronDown = ChevronDown;
  readonly Search = Search;

  properties: DtoProperty[] = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.propertyService.getPublicProperties().subscribe(
      (data: DtoProperty[]) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }
}
