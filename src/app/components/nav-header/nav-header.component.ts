import {
  Component, Inject, PLATFORM_ID, NgZone, OnDestroy, AfterViewInit, Input, signal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements AfterViewInit, OnDestroy {
  @Input() brand = 'Ruben Cipriano';
  @Input() links: NavLink[] = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skillset' },
    { label: 'Experience', href: '#work-experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
  ];

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  private readonly isBrowser: boolean;
  private scrollSub?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private zone: NgZone,
    library: FaIconLibrary,
    public theme: ThemeService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    library.addIcons(faBars, faXmark, faMoon, faSun);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.zone.runOutsideAngular(() => {
      const onScroll = () => {
        const shouldShow = window.scrollY > 24;
        if (this.scrolled() !== shouldShow) {
          this.zone.run(() => this.scrolled.set(shouldShow));
        }
      };
      onScroll();
      this.scrollSub = fromEvent(window, 'scroll').pipe(auditTime(120)).subscribe(onScroll);
    });
  }

  ngOnDestroy(): void {
    this.scrollSub?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleTheme(): void {
    this.theme.toggle();
  }
}
