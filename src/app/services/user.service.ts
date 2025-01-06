import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentApiUrl } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUrl = CurrentApiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  getAdminUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/admins`);
  }

  toggleStatus(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/update-status`, {});
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/profile`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/change-password`, data);
  }

  addUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/store`, data);
  }

  getNotificationSettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/notifications`);
  }

  updateNotifications(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/notifications`, data);
  }
}
