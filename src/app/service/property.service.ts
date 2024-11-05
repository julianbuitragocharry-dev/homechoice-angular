import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DtoProperty } from '../interfaces/property/dto-property';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = `${environment.apiBaseUrl}/properties/`;

  constructor(private http: HttpClient) {}

  getPublicProperties(
    name: string, 
    status: boolean | null, 
    minPrice: number | null, 
    minArea: number | null, 
    type: string,
    concept: string,
    page: number,
    size: number): Observable<any> {
    
    let params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('size', size.toString());

    if (status != null) {params = params.set('status', status);}
    if (minPrice != null) {params = params.set('minPrice', minPrice);}
    if(minArea != null) {params = params.set('minArea', minArea);}
    if(type != null) {params = params.set('type', type);}
    if(concept != null) {params = params.set('concept', concept);}

    return this.http.get<DtoProperty[]>(this.apiUrl + 'public', { params });
  }

  getPropertiesByAgentId(agentId: number): Observable<DtoProperty[]> {
    return this.http.get<DtoProperty[]>(this.apiUrl + 'agent/' + agentId);
  }

  getPropertiesNulls(): Observable<DtoProperty[]> {
    return this.http.get<DtoProperty[]>(this.apiUrl + 'nulls');
  }

  getPropertyById(id: number): Observable<DtoProperty> {
    return this.http.get<DtoProperty>(this.apiUrl + 'public/' + id);
  }

  

  // Auxiliary endpoints
  getPropertyConcept(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'public/concepts');
  }

  getPropertyType(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'public/types');
  }
}
