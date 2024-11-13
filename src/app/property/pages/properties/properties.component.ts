import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { CardComponent } from "../../components/card/card.component";
import { PropertyService } from '../../../service/property.service';
import { DtoProperty } from '../../../interfaces/property/dto-property';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ScrollTopComponent } from "../../../shared/components/scroll-top/scroll-top.component";

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    HeaderComponent, 
    CardComponent, 
    CommonModule, 
    LucideAngularModule, 
    NgxPaginationModule, 
    ReactiveFormsModule, 
    ScrollTopComponent
  ],
  templateUrl: './properties.component.html',
  styleUrl: '../../../shared/styles/pagination.css'
})
export class PropertiesComponent implements OnInit {
  //#region variables
  readonly Search = Search;

  properties: DtoProperty[] = [];
  statusList: {label: string, value: boolean}[] = [
    {label: 'Disponible', value: true},
    {label: 'No disponible', value: false},
  ];
  conceptList: {id: number, concept: string}[] = [];
  typeList: {id: number, type: string}[] = [];
  
  pageValue: number = 1;
  sizeValue: number = 12;
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
  //#endregion

  //#region form
  constructor(private propertyService: PropertyService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      status: [''],
      minPrice: [''],
      minArea: [''],
      type: [''],
      concept: ['']
    });
  }
  //#endregion

  ngOnInit(): void {
    this.loadProperties();
    this.loadConceptList();
    this.loadTypeList();
  }

  //#region methods
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
  //#endregion

  //#region api calls
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
}