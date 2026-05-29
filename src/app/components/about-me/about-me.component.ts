import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Experience } from '../../models/experience.model';

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  /** Optional profile photo; falls back to a monogram when absent. */
  @Input() photo?: string;

  /** Source of truth for the stats — derived from the experience data. */
  @Input() experiences: Experience[] | null = null;

  imageFailed = false;

  get stats(): Stat[] {
    return [
      { value: this.yearsOfExperience(), label: 'Years of experience' },
      { value: String(this.companyCount()), label: 'Companies' },
      { value: this.technologyCount(), label: 'Technologies' },
    ];
  }

  private yearsOfExperience(): string {
    const exps = this.experiences ?? [];
    if (!exps.length) return '5+';

    // Sum the actual worked duration of each role (so career gaps aren't counted).
    const totalMs = exps.reduce((sum, e) => {
      const start = new Date(e.startDate).getTime();
      const end = e.endDate && e.endDate.toLowerCase() !== 'present'
        ? new Date(e.endDate).getTime()
        : Date.now();
      if (isNaN(start) || isNaN(end) || end < start) return sum;
      return sum + (end - start);
    }, 0);

    const years = Math.floor(totalMs / (365.25 * 24 * 60 * 60 * 1000));
    return `${Math.max(years, 1)}+`;
  }

  private companyCount(): number {
    const exps = this.experiences ?? [];
    if (!exps.length) return 5;
    return new Set(exps.map(e => e.company.trim().toLowerCase())).size;
  }

  private technologyCount(): string {
    const exps = this.experiences ?? [];
    if (!exps.length) return '15+';

    const techs = new Set<string>();
    for (const e of exps) {
      for (const t of e.techStack ?? []) techs.add(t.trim().toLowerCase());
    }
    // Round down to the nearest 5 and show as "N+".
    const floored = Math.max(5, Math.floor(techs.size / 5) * 5);
    return `${floored}+`;
  }
}
