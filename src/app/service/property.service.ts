import { HttpClient } from '@angular/common/http';
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

  getPublicProperties(): Observable<DtoProperty[]> {
    return this.http.get<DtoProperty[]>(this.apiUrl + 'public');
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
}
