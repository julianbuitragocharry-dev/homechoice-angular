import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DtoProperties } from '../interfaces/dto-properties';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/api/properties/';

  constructor(private http: HttpClient) {}

  getPublicProperties(): Observable<DtoProperties[]> {
    return this.http.get<DtoProperties[]>(this.apiUrl + 'public');
  }

  getPropertiesByAgentId(agentId: number): Observable<DtoProperties[]> {
    return this.http.get<DtoProperties[]>(this.apiUrl + 'agent/' + agentId);
  }

  getPropertiesNulls(): Observable<DtoProperties[]> {
    return this.http.get<DtoProperties[]>(this.apiUrl + 'nulls');
  }

  getPropertyById(id: number): Observable<DtoProperties> {
    return this.http.get<DtoProperties>(this.apiUrl + id);
  }
}
