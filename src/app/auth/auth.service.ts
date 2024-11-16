import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from './jwt';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  currentUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
    this.currentUserLogged = new BehaviorSubject<boolean>(localStorage.getItem("token") != null);
    this.currentUserData = new BehaviorSubject<String>(localStorage.getItem("token") || "");
  }

  login(credentials: LoginRequest):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials, {withCredentials: true}).pipe(
      tap(userData => {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", userData.user);
        this.currentUserLogged.next(true);
        this.currentUserData.next(userData.token);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.currentUserLogged.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error("The backend returned a status code: ", error)
    }
    return throwError(() => new Error('An unexpected error has occurred. Please try again later.'));
  }

  getUserData():Observable<String> {
    return this.currentUserData.asObservable();
  }

  getUserLogged():Observable<boolean> {
    return this.currentUserLogged.asObservable();
  }

  getUserToken():String {
    return localStorage.getItem("token") || "";
  }

  validateToken(token: String): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/verify-token`, { token });
  }

  getRoles():Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/auth/roles`);
  }
}