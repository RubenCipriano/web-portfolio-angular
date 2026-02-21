import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faDownload, faEnvelope, faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ExperienceService } from './services/experience.service';
import { Experience } from './models/experience.model';
import { TechCardComponent } from './components/tech-card/tech-card.component';
import { ExperienceCardComponent } from './components/experience-card/experience-card.component';
import { ScrollTopButtonComponent } from './components/scroll-top/scroll-top.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TechCardComponent, ExperienceCardComponent, ScrollTopButtonComponent, FontAwesomeModule],
  providers: [ExperienceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio-web';
  experiences?: Experience[];
  currentYear = new Date().getFullYear();

  constructor(private experienceService: ExperienceService, library: FaIconLibrary) {
    library.addIcons(faChevronRight, faDownload, faEnvelope, faPhoneAlt, faMapMarkerAlt, faLinkedinIn, faGithub);
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
    });
  }
}
