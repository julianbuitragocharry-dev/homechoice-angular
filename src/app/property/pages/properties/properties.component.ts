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
    styleUrl: '../../../shared/styles/pagination.css'
  })
  export class PropertiesComponent implements OnInit {
    readonly ChevronDown = ChevronDown;
    readonly Search = Search;

    properties: DtoProperty[] = [];
    statusList: {label: string, value: boolean}[] = [
      {label: 'Disponible', value: true},
      {label: 'No disponible', value: false},
    ];

    conceptList: {id: number, concept: string}[] = [];
    typeList: {id: number, type: string}[] = [];
    
    pageValue: number = 1;
    sizeValue: number = 6;
    totalData: number = 0;

    filters = {
      name: '',
      status: null,
      concept: '',
      type: '',
      minPrice: null,
      minArea: null,
    };
    filterForm: FormGroup;

    constructor(private propertyService: PropertyService, private fb: FormBuilder) {
      this.filterForm = this.fb.group({
        name: [''],
        status: [''],
        minPrice: [''],
        minArea: [''],
        type: [''],
        concept: ['']
      });

      this.loadConceptList();
      this.loadTypeList()
    }

    ngOnInit(): void {
      this.loadProperties();
    }

    loadProperties(): void {
      this.propertyService.getPublicProperties(
        this.filters.name,
        this.filters.status,
        this.filters.minPrice,
        this.filters.minArea,
        this.filters.type,
        this.filters.concept,
        this.pageValue - 1,
        this.sizeValue
      ).subscribe(
        (data) => {
          this.properties = data.content;
          this.pageValue = data.pageable.pageNumber + 1;
          this.sizeValue = data.pageable.pageSize;
          this.totalData = data.totalElements;
        },
        (error) => {
          console.error('Error fetching properties:', error);
        }
      );
    }
    
    loadConceptList(): void {
      this.propertyService.getPropertyConcept().subscribe(
        (data: any[]) => {
          this.conceptList = data;
        },
        (error) => {
          console.error('Error fetching concept list:', error);
        }
      );
    }

    loadTypeList(): void {
      this.propertyService.getPropertyType().subscribe(
        (data: any[]) => {
          this.typeList = data;
        },
        (error) => {
          console.error('Error fetching type list:', error);
        }
      );
    }

    onSubmit(): void {
      this.filters = {
        name: this.filterForm.get('name')?.value || '',
        status: this.filterForm.get('status')?.value || null,
        concept: this.filterForm.get('concept')?.value || null,
        type: this.filterForm.get('type')?.value || null,
        minPrice: this.filterForm.get('minPrice')?.value || null,
        minArea: this.filterForm.get('minArea')?.value || null,
      }
      this.loadProperties();
    }

    onPageChange(page: number): void {
      this.pageValue = page;
      this.loadProperties();
    }
  }