import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';

type Item = {
  href: string; icon: string; label: string;
  class: 'linkedin' | 'github' | 'email' | 'phone';
  newTab?: boolean;
  transform?: string;
};

@Component({
  selector: 'app-contact-fab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-fab.component.html',
  styleUrls: ['./contact-fab.component.scss']
})
export class ContactFabComponent implements OnInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {}

  show = false;
  primaryHref = 'mailto:ruben@example.com';

  items: Item[] = [
    { href: 'https://www.linkedin.com/in/rúben-cipriano-109508197/', icon: 'fab fa-linkedin-in', label: 'LinkedIn', class: 'linkedin', newTab: true },
    { href: 'https://github.com/RubenCipriano', icon: 'fab fa-github', label: 'GitHub', class: 'github', newTab: true },
    { href: 'mailto:rubencipriano13@gmail.com', icon: 'fas fa-envelope', label: 'Email', class: 'email' },
    { href: 'tel:+351962860039', icon: 'fas fa-phone-alt', label: 'Phone', class: 'phone' }
  ];

  private resizeSub?: Subscription;

  ngOnInit() {
    // 1) SSR-safe first paint (no window): deterministic radius
    this.computeTransforms({ radius: 96 });

    // 2) Browser-only: recompute responsively + attach resize listener
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        const compute = () => {
          const isNarrow = typeof window !== 'undefined'
            ? window.matchMedia('(max-width: 992px)').matches
            : false;
          const radius = isNarrow ? 50 : 50;
          this.computeTransforms({ radius });
        };

        compute(); // after hydration

        this.resizeSub = fromEvent(window, 'resize')
          .pipe(auditTime(150))
          .subscribe(() => compute());
      });
    }
  }

  ngOnDestroy() {
    this.resizeSub?.unsubscribe();
  }

  onFabClick(event: MouseEvent) {
    const newTab = event.ctrlKey || event.metaKey || event.button === 1;
    if (!newTab) {
      event.preventDefault();
      this.show = !this.show;
    }
  }
  close() { this.show = false; }

  // --- Helper you specified: returns [0, 60, 120, 180] for 4 items ---
  private spacedAngles(n: number, start = 0, end = 180): number[] {
    return Array.from({ length: n }, (_, i) =>
      start + (i * (end - start)) / (n - 1)
    );
  }

  /**
   * Places items on a left-side semicircle using angles 0..180:
   * 0° = directly above the FAB center
   * 90° = directly left
   * 180° = directly below
   * This makes 1st item on top of the X, last item at the bottom of the close button.
   */
  private computeTransforms(opts: { radius: number }) {
    const { radius } = opts;
    const n = this.items.length;
    const angles = this.spacedAngles(n, 0, 180); // e.g., [0, 60, 120, 180]

    for (let i = 0; i < n; i++) {
      const a = (angles[i] * Math.PI) / 180; // radians, where 0 is "up"
      // Left semicircle about the FAB center:
      // x: negative = left, y: positive = down (CSS coordinates)
      const x = -radius * Math.sin(a);
      const y = -radius * Math.cos(a);

      this.items[i].transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    }
  }
}
