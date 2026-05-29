import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGraduationCap, faCertificate, faAward, faBook } from '@fortawesome/free-solid-svg-icons';
import { Education } from '../../models/education.model';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.scss']
})
export class EducationCardComponent implements OnInit {
  @Input() item!: Education;

  iconArray: [string, string] = ['fas', 'graduation-cap'];

  constructor(library: FaIconLibrary) {
    library.addIcons(faGraduationCap, faCertificate, faAward, faBook);
  }

  ngOnInit(): void {
    const fallback = this.item.type === 'certification' ? 'certificate' : 'graduation-cap';

    if (this.item.icon) {
      const parts = this.item.icon.split(' ');
      if (parts.length === 2) {
        let prefix = parts[0].replace('fa-', '');
        const name = parts[1].replace('fa-', '');
        if (prefix === 'solid') prefix = 'fas';
        if (prefix === 'brands') prefix = 'fab';
        this.iconArray = [prefix, name];
        return;
      }
    }

    this.iconArray = ['fas', fallback];
  }

  get isCertification(): boolean {
    return this.item.type === 'certification';
  }

  get typeLabel(): string {
    return this.isCertification ? 'Certification' : 'Education';
  }

  get credentialLabel(): string {
    return this.isCertification ? 'View certificate' : 'View diploma';
  }
}
