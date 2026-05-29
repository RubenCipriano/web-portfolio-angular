import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../models/education.model';

@Injectable({
  providedIn: 'root',
})
export class EducationService {

  private jsonUrl = 'assets/data/education.json';
  private cache?: Education[];

  constructor(private http: HttpClient) {}

  getEducation(): Observable<Education[]> {
    if (this.cache) {
      return new Observable(observer => {
        observer.next(this.cache!);
        observer.complete();
      });
    }

    return this.http.get<Education[]>(this.jsonUrl);
  }
}
