import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DtoUserResponse } from '../interfaces/user/dto-user-response';
import { DtoUser } from '../interfaces/user/dto-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<DtoUserResponse[]> {
    return this.http.get<DtoUserResponse[]>(`${this.apiUrl}`);
  }

  getUserById(id: number): Observable<DtoUser> {
    return this.http.get<DtoUser>(`${this.apiUrl}/${id}`);
  }

  createUser(user: DtoUser): Observable<DtoUserResponse> {
    return this.http.post<DtoUserResponse>(`${this.apiUrl}`, user);
  }

  updateUser(id: number, user: DtoUser): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
