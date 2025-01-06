import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentApiUrl } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = CurrentApiUrl;

  constructor(private http: HttpClient) {}

  getGroups(): Observable<any> {
    return this.http.get(`${this.apiUrl}/groups`);
  }

  toggleGroupStatus(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/groups/${id}/update-status`, {});
  }
}
