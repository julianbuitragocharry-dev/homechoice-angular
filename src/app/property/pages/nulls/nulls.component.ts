import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Search, Trash2, UserPen } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollTopComponent } from '../../../shared/components/scroll-top/scroll-top.component';
import { DtoProperty } from '../../../interfaces/property/dto-property';
import { PropertyService } from '../../../service/property.service';
import { DtoUserResponse } from '../../../interfaces/user/dto-user-response';
import { AgentService } from '../../../service/agent.service';

@Component({
  selector: 'app-nulls',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    NgxPaginationModule, 
    ReactiveFormsModule, 
    RouterLink,
    FormsModule,
    ScrollTopComponent
  ],
  templateUrl: './nulls.component.html',
  styleUrl: '../../../shared/styles/pagination.css'
})
export class NullsComponent {
  //#region variables
  readonly User = UserPen;
  readonly Trash2 = Trash2;
  readonly Search = Search;

  properties: DtoProperty[] = [];
  statusList: {label: string, value: boolean}[] = [
    {label: 'Disponible', value: true},
    {label: 'No disponible', value: false},
  ];
  conceptList: {id: number, concept: string}[] = [];
  typeList: {id: number, type: string}[] = [];
  agentList: DtoUserResponse[] = [];
  
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

  showDeleteModal: boolean = false;
  showChangeAgentModal: boolean = false;
  propertyToDelete: number | null = null;
  selectedPropertyId: number | null = null;
  selectedAgentId: number | null = null;
  //#endregion

  //#region form
  constructor(
    private propertyService: PropertyService, 
    private agentService: AgentService,
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
    this.loadAgents();
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

  openChangeAgentModal(propertyId: number): void {
    this.selectedPropertyId = propertyId;
    this.selectedAgentId = null;
    this.showChangeAgentModal = true;
  }

  closeChangeAgentModal(): void {
    this.showChangeAgentModal = false;
    this.selectedPropertyId = null;
    this.selectedAgentId = null;
  }

  confirmAgentChange(): void {
    if (this.selectedPropertyId && this.selectedAgentId) {
      this.propertyService.updateUserProperty(this.selectedPropertyId, this.selectedAgentId).subscribe({
        next: () => {
          this.loadProperties();
          this.closeChangeAgentModal();
          console.log('Agent updated successfully');
        },
        error: (error) => {
          console.error('Error updating agent:', error);
          this.closeChangeAgentModal();
        }
      });
    }
  }

  confirmDelete(property: DtoProperty): void {
    this.propertyToDelete = property.id;
    this.showDeleteModal = true;
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
    this.propertyService.getPropertiesNulls(
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

  loadAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (data: DtoUserResponse[]) => {
        this.agentList = data;
        console.log(this.agentList);
      },
      error: (error) => {
        console.error('Error fetching agents list:', error);
      }
    });
  }
  //#endregion
}
