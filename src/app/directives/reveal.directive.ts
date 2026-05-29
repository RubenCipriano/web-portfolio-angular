import {
  Directive, ElementRef, Inject, PLATFORM_ID, AfterViewInit, OnDestroy, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Lightweight scroll-reveal — replaces the AOS library.
 * Applies to any element carrying a `data-aos` attribute (so existing
 * templates need no changes). SSG-safe: does nothing on the server, so the
 * prerendered HTML stays visible even without JS.
 */
@Directive({
  selector: '[data-aos]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly isBrowser: boolean;
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const el = this.el.nativeElement;
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;

    // Already on screen at load → show immediately, no hide/flash.
    if (alreadyVisible) {
      el.classList.add('reveal', 'is-visible');
      return;
    }

    el.classList.add('reveal');

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
