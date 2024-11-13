import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../service/property.service';
import { DtoProperty } from '../../../interfaces/property/dto-property';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html'
})
export class EditPropertyComponent {
  //#region variables
  propertyForm: FormGroup;
  propertyId !: number;
  selectedAmenities: string[] = [];

  statusList: { label: string, value: boolean }[] = [
    { label: 'Disponible', value: true },
    { label: 'No disponible', value: false },
  ];
  
  conceptList: { id: number, concept: string }[] = [];
  typeList: { id: number, type: string }[] = [];
  amenitiesList: { id: number, amenity: string }[] = [];
  //#endregion

  //#region form
  // TODO: add validators
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private formBuilder: FormBuilder
  ) {
    this.propertyForm = this.formBuilder.group({
      name: ['', Validators.required],
      area: ['', Validators.required],
      price: ['', Validators.required],
      address: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)]],
      status: [true, Validators.required],
      description: ['', Validators.required],
      concept: ['', Validators.required],
      type: ['', Validators.required],
      amenities: [[], Validators.required]
    });
  }
  //#endregion

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      if (id) {
        this.propertyId = +id;
        this.fetchProperty(this.propertyId);
      }
    });
  }

  //#region methods
  onAmenityChange(event: any, amenity: string): void {
    if (event.target.checked) {
      this.selectedAmenities.push(amenity);
    } else {
      this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
    }
    this.propertyForm.patchValue({
      amenities: this.selectedAmenities
    });
  }

  isAmenitySelected(amenity: string): boolean {
    return this.selectedAmenities.includes(amenity);
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      const updatedProperty: DtoProperty = {
        id: this.propertyId,
        name: this.propertyForm.value.name,
        area: this.propertyForm.value.area,
        price: this.propertyForm.value.price,
        address: this.propertyForm.value.address,
        latitude: this.propertyForm.value.latitude,
        longitude: this.propertyForm.value.longitude,
        status: this.propertyForm.value.status,
        description: this.propertyForm.value.description,
        concept: this.propertyForm.value.concept,
        type: this.propertyForm.value.type,
        agent: 0,
        images: [],
        amenities: this.selectedAmenities
      };

      this.propertyService.updateProperty(this.propertyId, updatedProperty).subscribe(
        (response) => {
          console.log('Propiedad actualizada exitosamente', response);
          this.router.navigate([`/dashboard`]);
        },
        (error) => {
          console.error('Error al actualizar la propiedad', error);
        }
      );
    }
  }
  //#endregion

  //#region api calls
  fetchProperty(id: number): void {
    this.propertyService.getPropertyById(id).subscribe(
      (data) => {
        this.propertyForm.patchValue({
          name: data.name,
          area: data.area,
          price: data.price,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          status: data.status,
          description: data.description,
          concept: data.concept,
          type: data.type
        });
        this.selectedAmenities = data.amenities;
        this.loadConceptList();
        this.loadTypeList();
        this.loadAmenitiesList();
      }
    );
  }

  loadConceptList(): void {
    this.propertyService.getPropertyConcept().subscribe(
      (data) => {
        this.conceptList = data;
      }
    );
  }

  loadTypeList(): void {
    this.propertyService.getPropertyType().subscribe(
      (data) => {
        this.typeList = data;
      }
    );
  }

  loadAmenitiesList(): void {
    this.propertyService.getPropertyAmenities().subscribe(
      (data) => {
        this.amenitiesList = data;
      }
    );
  }
  //#endregion
}
