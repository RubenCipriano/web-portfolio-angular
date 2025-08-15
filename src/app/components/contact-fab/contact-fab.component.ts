// contact-fab.component.ts
import { Component } from '@angular/core';
import {
  trigger, transition, style, animate, query, stagger
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-fab',
  templateUrl: './contact-fab.component.html',
  styleUrls: ['./contact-fab.component.scss'],
  imports: [CommonModule],
  animations: [
    // Container grows from button upward; items cascade up/down
    trigger('fabMenu', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('220ms ease-out', style({ height: '*', opacity: 1 })),
        query('.contact-btn', [
          style({ transform: 'translateY(8px)', opacity: 0 }),
        ])
      ]),
      transition(':leave', [
        // hide items first from top to bottom (reverse stagger)
        query('.contact-btn', [
          stagger(-60, animate('140ms ease-in', style({ transform: 'translateY(-8px)', opacity: 0 })))
        ], { optional: true }),
        animate('180ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class ContactFabComponent {
  show = false;

  // make the FAB itself a contact link (choose your favourite)
  primaryHref = 'mailto:ruben@example.com';
  // e.g. WhatsApp: 'https://wa.me/351912345678'

  onFabClick(event: MouseEvent) {
    // Ctrl/Cmd/middle-click should open the link normally
    const isOpenInNewTab = event.ctrlKey || event.metaKey || event.button === 1;
    if (!isOpenInNewTab) {
      event.preventDefault(); // toggle instead of navigating
      this.show = !this.show;
    }
  }

  close() { this.show = false; }
}
