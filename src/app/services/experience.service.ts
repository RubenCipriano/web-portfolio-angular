import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience.model';

@Injectable({
  providedIn: 'root',
})

export class ExperienceService {

  private jsonUrl = 'assets/data/experiences.json';
  private cache?: Experience[];

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<Experience[]> {
    // Return cached data if available
    if (this.cache) {
      return new Observable(observer => {
        observer.next(this.cache!);
        observer.complete();
      });
    }
    
    return this.http.get<Experience[]>(this.jsonUrl);
  }
}
