import { Injectable, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly isBrowser: boolean;

  /** Current theme as a signal so templates can react to it. */
  readonly theme = signal<Theme>('dark');
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /** Called once at startup (APP_INITIALIZER). Resolves the active theme. */
  init(): void {
    this.theme.set(this.resolveInitialTheme());
    this.apply();
  }

  toggle(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.apply();
  }

  private resolveInitialTheme(): Theme {
    if (!this.isBrowser) {
      // Trust whatever the prerendered/static markup declared (defaults to dark).
      const attr = this.document.documentElement.getAttribute('data-theme');
      return attr === 'light' ? 'light' : 'dark';
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      /* localStorage unavailable */
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private apply(): void {
    const theme = this.theme();
    this.document.documentElement.setAttribute('data-theme', theme);

    if (!this.isBrowser) return;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }

    const meta = this.document.querySelector('meta[name="theme-color"]:not([media])')
      ?? this.document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', theme === 'dark' ? '#000032' : '#f4f6fb');
  }
}
