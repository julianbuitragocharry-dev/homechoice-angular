import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Eye, LucideAngularModule, Pencil, Search, Trash2 } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollTopComponent } from '../../../shared/components/scroll-top/scroll-top.component';
import { DtoProperty } from '../../../interfaces/property/dto-property';
import { PropertyService } from '../../../service/property.service';

@Component({
  selector: 'app-mylist',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterLink,
    ScrollTopComponent
  ],
  templateUrl: './mylist.component.html',
  styleUrl: '../../../shared/styles/pagination.css'
})
export class MylistComponent {
  //#region variables
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly Search = Search;
  readonly Eye = Eye;

  properties: DtoProperty[] = [];
  statusList: {label: string, value: boolean}[] = [
    {label: 'Disponible', value: true},
    {label: 'No disponible', value: false},
  ];
  conceptList: {id: number, concept: string}[] = [];
  typeList: {id: number, type: string}[] = [];
  
  pageValue: number = 1;
  sizeValue: number = 20;
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

  showDeleteModal: boolean = false;
  propertyToDelete: number | null = null;
  //#endregion

  //#region form
  constructor(
    private propertyService: PropertyService, 
    private fb: FormBuilder, 
    private router: Router
  ) {
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
      concept: this.filterForm.get('concept')?.value || '',
      type: this.filterForm.get('type')?.value || '',
      minPrice: this.filterForm.get('minPrice')?.value || null,
      minArea: this.filterForm.get('minArea')?.value || null,
    }
    this.loadProperties();
  }

  onPageChange(page: number): void {
    this.pageValue = page;
    this.loadProperties();
  }

  onEdit(property: DtoProperty): void {
    this.router.navigate([`/dashboard/edit-property/${property.id}`]);
  }

  confirmDelete(property: DtoProperty): void {
    this.propertyToDelete = property.id;
    this.showDeleteModal = true;
  }

  view(property: DtoProperty): void {
    const url = `/properties/${property.id}`;
    window.open(url, '_blank');
  }

  closeModal(): void {
    this.showDeleteModal = false;
    this.propertyToDelete = null;
  }
  
  deleteProperty(): void {
    if (this.propertyToDelete) {
      this.propertyService.deleteProperty(this.propertyToDelete).subscribe({
        next: () => {
          this.properties = this.properties.filter(p => p.id !== this.propertyToDelete);
          this.closeModal();
          this.loadProperties();
        },
        error: (error) => {
          console.error('Error deleting property:', error);
          this.closeModal();
        }
      });
    }
  }
  //#endregion

  //#region api calls
  loadProperties(): void {
    this.propertyService.getPropertiesByAgentId(
      this.filters.name,
      this.filters.status,
      this.filters.minPrice,
      this.filters.minArea,
      this.filters.type,
      this.filters.concept,
      this.pageValue - 1,
      this.sizeValue
    ).subscribe({
      next: (data) => {
        this.properties = data.content;
        this.pageValue = data.pageable.pageNumber + 1;
        this.sizeValue = data.pageable.pageSize;
        this.totalData = data.totalElements;
      },
      error: (error) => {
        console.error('Error fetching properties:', error);
      }
    });
  }
  
  loadConceptList(): void {
    this.propertyService.getPropertyConcept().subscribe({
      next: (data: any[]) => {
        this.conceptList = data;
      },
      error: (error) => {
        console.error('Error fetching concept list:', error);
      }
    });
  }

  loadTypeList(): void {
    this.propertyService.getPropertyType().subscribe({
      next: (data: any[]) => {
        this.typeList = data;
      },
      error: (error) => {
        console.error('Error fetching type list:', error);
      }
    });
  }
  //#endregion
}
