import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from './services/experience.service';
import { Experience } from './models/experience.model';
import { TechCardComponent } from './components/tech-card/tech-card.component';
import { ExperienceCardComponent } from './components/experience-card/experience-card.component';
import {
  trigger, transition, style, animate, query, stagger
} from '@angular/animations';
import { ContactFabComponent } from './components/contact-fab/contact-fab.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TechCardComponent, ExperienceCardComponent, ContactFabComponent],
  providers: [ExperienceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio-web';

  experiences?: Experience[];

  showContacts = true;

  toggleContacts() {
    this.showContacts = !this.showContacts;
  }

  constructor(private experienceService: ExperienceService) {

  }

  techCards = [
    {
      title: 'Angular',
      description: 'Angular framework',
      image: 'assets/angular_logo.svg',
      bgColorClass: 'bg-red-dark'
    },
    {
      title: 'Typescript',
      description: 'Javascript but better',
      image: 'assets/typescript_logo.svg',
      bgColorClass: 'bg-blue-dark'
    },
    {
      title: 'C#',
      description: 'Programming Language',
      image: 'assets/csharp_logo.svg',
      bgColorClass: 'bg-purple-dark'
    },
    {
      title: 'GIT',
      description: 'Version Control',
      image: 'assets/git_logo.svg',
      bgColorClass: 'bg-orange-dark'
    },
    {
      title: 'SCSS',
      description: 'CSS but better',
      image: 'assets/sass_logo.svg',
      bgColorClass: 'bg-pink-dark'
    },
    {
      title: 'SQL',
      description: 'Database',
      image: '/assets/sql_logo.png',
      bgColorClass: 'bg-white-dark'
    },
    {
      title: 'NodeJS',
      description: 'Javascript framework',
      image: 'assets/nodejs_logo.svg',
      bgColorClass: 'bg-green-dark'
    },
    {
      title: 'Bootstrap',
      description: 'Tailwind but older',
      image: 'assets/bootstrap_logo.svg',
      bgColorClass: 'bg-purple-dark'
    },
  ];  

  ngOnInit(): void {
    this.experienceService.getExperiences().subscribe({
      next: (data) => {
        this.experiences = data;
      }
    })
  }
  
}
