import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faDownload, faEnvelope, faPhoneAlt, faMapMarkerAlt, faCode, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

import { ExperienceService } from './services/experience.service';
import { ProjectService } from './services/project.service';
import { EducationService } from './services/education.service';
import { Experience } from './models/experience.model';
import { Project } from './models/project.model';
import { Education } from './models/education.model';

import { TechCardComponent } from './components/tech-card/tech-card.component';
import { ExperienceCardComponent } from './components/experience-card/experience-card.component';
import { ScrollTopButtonComponent } from './components/scroll-top/scroll-top.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { EducationCardComponent } from './components/education-card/education-card.component';
import { RevealDirective } from './directives/reveal.directive';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FontAwesomeModule,
    TechCardComponent,
    ExperienceCardComponent,
    ScrollTopButtonComponent,
    NavHeaderComponent,
    AboutMeComponent,
    ProjectCardComponent,
    EducationCardComponent,
    RevealDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio-web';
  experiences?: Experience[];
  projects?: Project[];
  education?: Education[];
  currentYear = new Date().getFullYear();

  constructor(
    private experienceService: ExperienceService,
    private projectService: ProjectService,
    private educationService: EducationService,
    library: FaIconLibrary
  ) {
    library.addIcons(faChevronRight, faDownload, faEnvelope, faPhoneAlt, faMapMarkerAlt, faCode, faLanguage, faLinkedinIn, faGithub);
  }

  // Ordered by how much I actually use them day to day.
  techCards = [
    { title: 'TypeScript', description: 'My primary language', image: 'assets/typescript_logo.svg', bgColorClass: 'bg-blue-dark' },
    { title: 'Next.js', description: 'React framework', image: 'assets/nextjs_logo.svg', bgColorClass: 'bg-white-dark' },
    { title: 'React', description: 'UI library', image: 'assets/react_logo.svg', bgColorClass: 'bg-blue-dark' },
    { title: 'Angular', description: 'SPA framework', image: 'assets/angular_logo.svg', bgColorClass: 'bg-red-dark' },
    { title: 'C#', description: '.NET back-end', image: 'assets/csharp_logo.svg', bgColorClass: 'bg-purple-dark' },
    { title: 'SQL Server', description: 'Relational database', image: 'assets/sql_logo.svg', bgColorClass: 'bg-white-dark' },
    { title: 'Node.js', description: 'JavaScript runtime', image: 'assets/nodejs_logo.svg', bgColorClass: 'bg-green-dark' },
    { title: 'Git', description: 'Version control', image: 'assets/git_logo.svg', bgColorClass: 'bg-orange-dark' },
  ];

  // Spoken languages.
  languages = [
    { name: 'Portuguese', level: 'Native', flag: 'https://flagcdn.com/24x18/pt.png' },
    { name: 'English', level: 'Professional working proficiency', flag: 'https://flagcdn.com/24x18/gb.png' },
  ];

  ngOnInit(): void {
    this.experienceService.getExperiences().subscribe({
      next: (data) => (this.experiences = data),
    });

    this.projectService.getProjects().subscribe({
      next: (data) => (this.projects = data),
    });

    this.educationService.getEducation().subscribe({
      next: (data) => (this.education = data),
    });
  }
}
