import { Component } from '@angular/core';
import { TechCardComponent } from '../components/tech-card/tech-card.component';
import { CommonModule } from '@angular/common';
import { ExperienceCardComponent } from '../components/experience-card/experience-card.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TechCardComponent, ExperienceCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-web';

  techCards = [
    {
      title: 'Angular',
      description: 'Angular framework',
      image: '/assets/angular_logo.png',
      bgColorClass: 'bg-red-dark'
    },
    {
      title: 'Typescript',
      description: 'Javascript but better',
      image: '/assets/typescript_logo.png',
      bgColorClass: 'bg-blue-dark'
    },
    {
      title: 'C#',
      description: 'Programming Language',
      image: '/assets/csharp_logo.png',
      bgColorClass: 'bg-purple-dark'
    },
    {
      title: 'GIT',
      description: 'Version Control',
      image: '/assets/git_logo.png',
      bgColorClass: 'bg-orange-dark'
    },
    {
      title: 'SCSS',
      description: 'CSS but better',
      image: '/assets/sass_logo.png',
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
      image: '/assets/nodejs_logo.png',
      bgColorClass: 'bg-green-dark'
    },
    {
      title: 'Bootstrap',
      description: 'Tailwind but older',
      image: '/assets/bootstrap_logo.png',
      bgColorClass: 'bg-purple-dark'
    },
  ];  

   experiences = [
    {
      role: 'Full stack Developer',
      company: 'Neotalent Conclusion',
      startDate: '2024-06-01',
      endDate: 'Present',
      location: 'Lisboa, Portugal',
      workType: 'Hybrid',
      icon: 'fa-solid fa-briefcase',
      flagSrc: 'https://flagcdn.com/24x18/pt.png',
      description: `Working as a Full-Stack developer as a consultant for Vortal, a client in Lisbon as well, working in the operations teams, checking tickets and fixing problems and incidents related to the e-tendering public platform`,
    },
    {
      role: 'Back end Developer',
      company: 'VIA Consulting S.A.',
      startDate: '2023-01-01',
      endDate: '2024-06-01',
      location: 'Lisboa, Portugal',
      workType: 'Remote',
      icon: 'fa-solid fa-database',
      flagSrc: 'https://flagcdn.com/24x18/pt.png',
      description: `Worked as a Backend developer using C# and Java as main programming languages, worked alongside Ageas Seguros for clients such as Pêtis, Millennium and ActivoBanco as well as some VISA clients for reporting integrations`,
    },
    {
      role: 'Front-end Developer',
      company: 'Emvenci Business Services',
      startDate: '2022-03-01',
      endDate: '2022-08-01',
      location: 'Lisboa, Portugal',
      workType: 'Presencial',
      icon: 'fa-solid fa-code',
      flagSrc: 'https://flagcdn.com/24x18/pt.png',
      description: `Worked as a frontend developer, fixing bugs and implementing new features in a Atomic Design using Angular.`,
    },
    {
      role: 'Full stack Developer',
      company: 'Arquiconsult',
      startDate: '2020-03-01',
      endDate: '2020-08-01',
      location: 'Odivelas, Lisboa, Portugal',
      workType: 'Presencial',
      icon: 'fa-solid fa-laptop-code',
      flagSrc: 'https://flagcdn.com/24x18/pt.png',
      description: `Worked as a full stack developer making backend, frontend and helping the mobile team using Xamarin.`,
    }
  ];
  
}
