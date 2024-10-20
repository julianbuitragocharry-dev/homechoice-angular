import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DtoProperty } from '../interfaces/dto-property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/api/properties/';

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
    return this.http.get<DtoProperty>(this.apiUrl + id);
  }
}
