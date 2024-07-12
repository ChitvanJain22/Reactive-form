import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'http://localhost:3000/data';
  dataSet: any[] = [];

  constructor(private http: HttpClient) {}

  onSubmit(formData: any): Observable<any> {
    return this.http.post<any>(this.dataUrl, formData);
  }

  updateEntry(id: number, formData: any): Observable<any> {
    return this.http.put<any>(`${this.dataUrl}/${id}`, formData);
  }

  receive(id: number): Observable<any> {
    return this.http.get<any>(`${this.dataUrl}?mobileNumber=${id}`);
  }
}
