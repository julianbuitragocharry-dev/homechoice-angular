import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../service/property.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CloudUpload, LucideAngularModule } from 'lucide-angular';
import { ScrollTopComponent } from "../../../shared/components/scroll-top/scroll-top.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    LucideAngularModule, 
    ScrollTopComponent
  ],
  templateUrl: './create.component.html'
})
export class CreatePropertyComponent implements OnInit{
  //#region variables
  // lucide icons
  readonly CloudUpload = CloudUpload;

  // form
  propertyForm: FormGroup;
  images: File[] = [];
  selectedAmenities: string[] = [];

  // data
  statusList: {label: string, value: boolean}[] = [
    {label: 'Disponible', value: true},
    {label: 'No disponible', value: false},
  ];
  conceptList: {id: number, concept: string}[] = [];
  typeList: {id: number, type: string}[] = [];
  amenitiesList: {id: number, amenity: string}[] = [];
  //#endregion

  //#region form

  constructor(
    private propertyService: PropertyService, 
    private formBuilder: FormBuilder,
    private router: Router
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
      images: [Validators.required],
      amenities: [[], Validators.required]
    });
  }
  //#endregion

  ngOnInit(): void {
    this.loadAmenitiesList();
    this.loadConceptList();
    this.loadTypeList();
  }
  
  //#region methods
  onSubmit() {
      if (this.propertyForm.valid) {
        const formData = new FormData();

      // data json
      const data = {
        name: this.propertyForm.value.name,
        area: this.propertyForm.value.area,
        price: this.propertyForm.value.price,
        address: this.propertyForm.value.address,
        latitude: this.propertyForm.value.latitude,
        longitude: this.propertyForm.value.longitude,
        status: this.propertyForm.value.status,
        description: this.propertyForm.value.description,
        agent: 1, // fake id
        concept: this.propertyForm.value.concept,
        type: this.propertyForm.value.type,
        amenities: this.selectedAmenities
      };
      formData.append('data', new Blob([JSON.stringify(data)], {
        type: 'application/json'
      }));
      console.log(data);

      // images files
      this.images.forEach((file) => {
        console.log(file);
        formData.append('images', file, file.name);
      });

      console.log(formData);

      this.propertyService.saveProperty(formData).subscribe(
        (response) => {
          console.log('Propiedad guardada exitosamente', response);
          this.router.navigate([`/dashboard`]);
        },
        (error) => {
          console.error('Error al guardar la propiedad', error);
        }
      );
    }
  }

  onFileChange(event: any) {
    this.images = Array.from(event.target.files);
  }

  onAmenityChange(event: any, amenity: string) {
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
  //#endregion

  //#region api calls
  loadAmenitiesList(): void {
    this.propertyService.getPropertyAmenities().subscribe(
      (data: any[]) => {
        this.amenitiesList = data;
      },
      (error) => {
        console.error('Error fetching amenities list:', error);
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
  //#endregion
}
