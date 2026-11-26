import { useState, type MouseEvent } from 'react';

interface NavbarProps {
  onShowDocs: () => void;
}

const NAV_ITEMS = [
  { href: '#activities', label: 'Daftar Kegiatan' },
  { href: '#activity-form', label: 'Tambah Kegiatan' },
] as const;

const originalScrollBehavior: string = document.documentElement.style.scrollBehavior;
let activeScrollAnimation: number | null = null;

export default function Navbar({ onShowDocs }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleNavigationClick(event: MouseEvent<HTMLAnchorElement>): void {
    const href: string | null = event.currentTarget.getAttribute('href');
    const target: HTMLElement | null = href?.startsWith('#')
      ? document.querySelector<HTMLElement>(href)
      : null;

    if (href && target) {
      const startPosition: number = window.scrollY;
      const headerOffset: number = 88;
      const targetPosition: number = Math.max(
        0,
        Math.min(
          target.getBoundingClientRect().top + startPosition - headerOffset,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );
      const distance: number = targetPosition - startPosition;
      const duration: number = 1400;
      const startTime: number = performance.now();

      event.preventDefault();
      if (activeScrollAnimation !== null) {
        cancelAnimationFrame(activeScrollAnimation);
      }
      document.documentElement.style.scrollBehavior = 'auto';

      function animate(currentTime: number): void {
        const progress: number = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress: number = 0.5 - Math.cos(progress * Math.PI) / 2;

        window.scrollTo({
          top: startPosition + distance * easedProgress,
          left: 0,
          behavior: 'auto',
        });

        if (progress < 1) {
          activeScrollAnimation = requestAnimationFrame(animate);
        } else {
          document.documentElement.style.scrollBehavior = originalScrollBehavior;
          activeScrollAnimation = null;
          history.pushState(null, '', href);
        }
      }

      activeScrollAnimation = requestAnimationFrame(animate);
    }

    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="nav-container" aria-label="Navigasi utama">
        <a className="nav-brand" href="#main-content">
          <span>Daftar Kegiatan</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">
            {isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          </span>
          <span className="nav-toggle-bars" aria-hidden="true" />
        </button>

        <ul
          id="primary-navigation"
          className={`nav-links${isOpen ? ' is-open' : ''}`}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                className="nav-link"
                href={item.href}
                onClick={handleNavigationClick}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="nav-link"
              href="https://react.dev/learn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavigationClick}
            >
              Dokumentasi React
            </a>
          </li>
          <li>
            <button
              type="button"
              className="nav-link nav-link-button"
              onClick={() => {
                onShowDocs();
                setIsOpen(false);
              }}
            >
              Tentang Komponen
            </button>
          </li>
          <li>
            <a
              className="nav-link nav-external"
              href="https://fathanra.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavigationClick}
            >
              Profil Tugas 2
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
