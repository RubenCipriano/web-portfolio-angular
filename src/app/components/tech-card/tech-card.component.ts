import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tech-card',
  templateUrl: './tech-card.component.html',
  styleUrls: ['./tech-card.component.scss'],
  imports: [CommonModule]
})
export class TechCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() bgColorClass!: string;
}
