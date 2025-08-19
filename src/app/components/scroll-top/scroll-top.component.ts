// scroll-top-button.component.ts
import {
  Component, Inject, PLATFORM_ID, NgZone, OnDestroy, AfterViewInit, Input
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-scroll-top-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      class="scroll-top"
      [class.show]="show"
      [attr.href]="'#' + targetId"
      aria-label="Back to top"
      (click)="onClick($event)"
    >
      <i class="fas fa-arrow-up"></i>
    </a>
  `,
  styles: [`
    .scroll-top{
      position:fixed; right:15px; bottom:15px;
      padding:25px;
      display:flex; align-items:center; justify-content:center;
      background:var(--primary-color-darker); color:#fff; font-size:20px;
      cursor:pointer; z-index:1100;
      opacity:0; transform:translateY(8px); pointer-events:none;
      transition:opacity .2s ease, transform .2s ease;
    }
    .scroll-top.show{
      opacity:1; transform:translateY(0); pointer-events:auto;
    }
    @media (prefers-reduced-motion: reduce){
      .scroll-top{ transition:none; }
    }
  `]
})
export class ScrollTopButtonComponent implements AfterViewInit, OnDestroy {
  /** ID of the top bar (or any element) whose height is the threshold */
  @Input() checkId = 'home';

  /** Where to scroll when clicked */
  @Input() targetId = 'skillset';

  /** Fallback threshold (px) if checkId isn't found */
  @Input() thresholdPx = 300;

  /** Extra pixels to add/subtract from computed height (e.g., sticky margins) */
  @Input() thresholdOffset = 0;

  show = false;

  private isBrowser: boolean;
  private scrollSub?: Subscription;
  private resizeSub?: Subscription;
  private threshold = 0; // computed from checkId element height (or fallback)

  constructor(@Inject(PLATFORM_ID) platformId: Object, private zone: NgZone) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // Initial compute + listeners
    this.zone.runOutsideAngular(() => {
      const recompute = () => this.computeThreshold();
      const onScroll = () => this.updateVisibility();

      // Compute once after hydration
      recompute();
      onScroll();

      // Listen to resize (layout changes) and scroll (visibility)
      this.resizeSub = fromEvent(window, 'resize').pipe(auditTime(150)).subscribe(recompute);
      this.scrollSub = fromEvent(window, 'scroll').pipe(auditTime(120)).subscribe(onScroll);
    });
  }

  ngOnDestroy() {
    this.scrollSub?.unsubscribe();
    this.resizeSub?.unsubscribe();
  }

  private computeThreshold() {
    const el = document.getElementById(this.checkId);
    // Use element's rendered height if present; else, fallback
    const h = el ? Math.max(el.offsetHeight || 0, el.getBoundingClientRect().height || 0) : this.thresholdPx;
    this.threshold = Math.max(0, Math.round(h + this.thresholdOffset));
    // After threshold changes, re-check visibility
    this.updateVisibility();
  }

  private updateVisibility() {
    const scrolled =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // Show only after the user has scrolled beyond the top bar height
    const shouldShow = scrolled > this.threshold;

    // Bring back into Angular only if value changes (avoid extra change detection)
    if (this.show !== shouldShow) {
      this.zone.run(() => (this.show = shouldShow));
    }
  }

  onClick(ev: MouseEvent) {
    if (!this.isBrowser) return;
    const el = document.getElementById(this.targetId);
    if (el) {
      ev.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
