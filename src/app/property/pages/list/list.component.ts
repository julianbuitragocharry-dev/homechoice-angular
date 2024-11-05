import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DtoProperty } from '../../../interfaces/property/dto-property';
import { LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { PropertyService } from '../../../service/property.service';

@Component({
  selector: 'app-list-properties',
  standalone: true,
  imports: [CommonModule, LucideAngularModule ],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit{
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;

  showDeleteModal: boolean = false;
  propertyToDelete: number | null = null;

  properties: DtoProperty[] = [];

  constructor(private propertyService: PropertyService) { }
  
  ngOnInit(): void {
    /*
    this.propertyService.getPublicProperties().subscribe(
      (data: DtoProperty[]) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );*/
  }
  
  onEdit(property: DtoProperty): void {
    console.log('Edit property:', property);
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
      console.log('Delete property ID:', this.propertyToDelete);
      // Call service to delete property
      this.closeModal();
    }
  }
}
