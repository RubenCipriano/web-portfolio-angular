import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBriefcase, faCode, faCog, faDatabase, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
  imports: [CommonModule, FontAwesomeModule]
})
export class ExperienceCardComponent implements OnInit {
  @Input() role!: string;
  @Input() company!: string;
  @Input() client?: string;    // end-client for consultancy placements
  @Input() description!: string;
  @Input() highlights: string[] = []; // achievement / responsibility bullets
  @Input() location!: string;
  @Input() flagSrc!: string;
  @Input() icon!: string;
  @Input() startDate!: string; // expected format: 'YYYY-MM-DD' or ISO
  @Input() endDate!: string;   // can be 'Present' or 'YYYY-MM-DD'
  @Input() techStack: string[] = []; // like ['Java', 'Angular', 'Docker']

  duration!: string;
  iconArray: [string, string] = ['fas', 'briefcase'];

  constructor(library: FaIconLibrary) {
    // Add all solid icons used in experience data
    library.addIcons(faBriefcase, faCode, faCog, faDatabase, faLaptopCode);
  }

  ngOnInit(): void {
    this.calculateDuration();
    // Convert icon string (e.g., 'fa-solid fa-code') to array format ['fas', 'code']
    if (this.icon) {
      const parts = this.icon.split(' ');
      if (parts.length === 2) {
        let prefix = parts[0].replace('fa-', '');
        const name = parts[1].replace('fa-', '');
        
        // Map CSS class prefixes to FontAwesome library prefixes
        if (prefix === 'solid') prefix = 'fas';
        if (prefix === 'brands') prefix = 'fab';
        
        this.iconArray = [prefix as any, name];
      }
    }
  }

  calculateDuration(): void {
    const start = new Date(this.startDate);
    const end = this.endDate.toLowerCase() === 'present' ? new Date() : new Date(this.endDate);

    const diff = this.dateDiff(start, end);
    this.duration = this.formatDuration(diff);
  }

  dateDiff(start: Date, end: Date): { months: number, years: number, days: number } {
    const diffYears = end.getFullYear() - start.getFullYear();
    const diffMonths = end.getMonth() - start.getMonth();
    const diffDays = end.getDate() - start.getDate();

    let years = diffYears;
    let months = diffMonths;
    let days = diffDays;

    if (days < 0) {
      months -= 1;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); // days in previous month
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  }

  formatDuration({ years, months, days }: { years: number, months: number, days: number }): string {
    const parts = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
    if (days > 0 && parts.length === 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    return parts.join(' & ');
  }
}
