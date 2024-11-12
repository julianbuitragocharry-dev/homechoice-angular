import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DTOAgentResponse } from '../interfaces/agent/dto-agent-response';
import { environment } from '../../environments/environment';
import { DtoAgent } from '../interfaces/agent/dto-agent';
import { DtoUserResponse } from '../interfaces/user/dto-user-response';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  apiUrl = `${environment.apiBaseUrl}/users/`;

  constructor(private http: HttpClient) {}
  
  getAllAgents(
    nit: string,
    page: number,
    size: number
  ): Observable<any> {
    let params = new HttpParams()
    .set('nit', nit)
    .set('page', page.toString())
    .set('size', size.toString());

    return this.http.get<DtoUserResponse[]>(`${this.apiUrl}agents`, { params });
  }

  getAgentById(agentId: number): Observable<DTOAgentResponse> {
    return this.http.get<DTOAgentResponse>(this.apiUrl + 'public/agents/' + agentId);
  }

  createAgent(agent: DtoAgent): Observable<DtoUserResponse> {
    return this.http.post<DtoUserResponse>(`${this.apiUrl}agents`, agent);
  }

  updateAgent(id: number, agent: DtoAgent): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}agents/${id}`, agent);
  }

  deleteAgent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}agents/${id}`);
  }
}
