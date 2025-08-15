import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
  imports: [CommonModule]
})
export class ExperienceCardComponent implements OnInit {
  @Input() role!: string;
  @Input() company!: string;
  @Input() description!: string;
  @Input() location!: string;
  @Input() flagSrc!: string;
  @Input() icon!: string;
  @Input() startDate!: string; // expected format: 'YYYY-MM-DD' or ISO
  @Input() endDate!: string;   // can be 'Present' or 'YYYY-MM-DD'
  @Input() techStack: string[] = []; // like ['Java', 'Angular', 'Docker']

  duration!: string;

  ngOnInit(): void {
    this.calculateDuration();
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
