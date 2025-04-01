import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience.model';

@Injectable({
  providedIn: 'root',
})

export class ExperienceService {

  private jsonUrl = 'assets/data/experiences.json';

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.jsonUrl);
  }
}
