import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { CardComponent } from "../../components/card/card.component";
import { PropertyService } from '../../../service/property.service';
import { DtoProperty } from '../../../interfaces/property/dto-property';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDown, Search } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [HeaderComponent, CardComponent, CommonModule, LucideAngularModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent implements OnInit {
  readonly ChevronDown = ChevronDown;
  readonly Search = Search;

  properties: DtoProperty[] = [];
  
  disponibilidadList: any[] = [];
  conceptoList: any[] = [];
  tipoList: any[] = [];
  
  page: number = 1;
  size: number = 6;
  
  filterForm: FormGroup;

  constructor(private propertyService: PropertyService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      disponibilidad: [''],
      concepto: [''],
      tipo: [''],
      desde: [''],
      area: ['']
    });
  }

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
