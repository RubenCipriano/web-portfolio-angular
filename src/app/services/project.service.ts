import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private jsonUrl = 'assets/data/projects.json';
  private cache?: Project[];

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    if (this.cache) {
      return new Observable(observer => {
        observer.next(this.cache!);
        observer.complete();
      });
    }

    return this.http.get<Project[]>(this.jsonUrl);
  }
}
