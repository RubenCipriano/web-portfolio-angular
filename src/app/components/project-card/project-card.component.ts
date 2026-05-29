import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;

  /** Set when the thumbnail fails to load so we can show the fallback. */
  imageFailed = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(faArrowUpRightFromSquare, faGithub);
  }

  get initial(): string {
    return this.project?.title?.charAt(0)?.toUpperCase() ?? '#';
  }
}
