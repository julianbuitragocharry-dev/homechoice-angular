import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { CardComponent } from "../../components/card/card.component";
import { PropertyService } from '../../../service/property.service';
import { DtoProperties } from '../../../interfaces/dto-properties';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [HeaderComponent, CardComponent, CommonModule],
  templateUrl: './properties.component.html'
})
export class PropertiesComponent implements OnInit {
  properties: DtoProperties[] = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.propertyService.getPublicProperties().subscribe(
      (data: DtoProperties[]) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }
}
