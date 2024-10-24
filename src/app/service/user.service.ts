import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DTOAgentResponse } from '../interfaces/user/dtoagent-response';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = `${environment.apiBaseUrl}/api/users/`;

  constructor(private http: HttpClient) {}

  getAgentById(agentId: number): Observable<DTOAgentResponse> {
    return this.http.get<DTOAgentResponse>(this.apiUrl + 'public/agents/' + agentId);
  }
}
