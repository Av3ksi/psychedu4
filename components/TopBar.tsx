'use client';
import { Link, usePathname } from '@/i18n/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LocaleSwitcher from './LocaleSwitcher';
import { LogOut, User, BookOpen, FileText, Home, Menu, X } from 'lucide-react';
// --- NEUE IMPORTS: useState, useEffect, useRef ---
import { useState, useEffect, useRef } from 'react';
// --- ENDE NEUE IMPORTS ---
import { useSubscription } from '@/hooks/useSubscription';
import { useTranslations } from 'next-intl';

export default function TopBar() {
  const { user, signOut } = useAuth();
  const { subscription } = useSubscription();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('TopBar');

  // --- NEUER CODE: Scroll-Verhalten ---
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Prüfen, ob wir auf der Startseite sind
    const isHomepage = pathname === '/';

    if (!isHomepage) {
      // Auf allen anderen Seiten ist die Bar immer sichtbar
      setIsVisible(true);
      return; // Keinen Listener hinzufügen
    }

    // Diese Funktion wird bei jedem Scroll-Event auf der Startseite ausgeführt
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        // Ganz oben: immer sichtbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Runterscrollen: ausblenden
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Mobiles Menü bei Scrollen schliessen
      } else {
        // Hochscrollen: einblenden
        setIsVisible(true);
      }
      
      // Aktuelle Position für den nächsten Vergleich speichern
      lastScrollY.current = currentScrollY;
    };

    // Listener hinzufügen
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup-Funktion: Listener entfernen, wenn die Komponente verlässt
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]); // Neu ausführen, wenn sich die Seite ändert
  // --- ENDE NEUER CODE ---

  const navLinks = [
    { href: '/', label: t('startseite'), icon: <Home className="w-4 h-4" /> },
    { href: '/modules', label: t('module'), icon: <BookOpen className="w-4 h-4" /> },
    { href: '/sources', label: t('quellen'), icon: <FileText className="w-4 h-4" /> },
    { href: '/profile', label: t('profil'), icon: <User className="w-4 h-4" /> },
  ];

  const isActive = (href: string) => pathname === href;

  const renderNavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
            isActive(link.href)
              ? 'bg-primary/10 text-primary'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
      <button
        onClick={() => {
          signOut();
          setIsMobileMenuOpen(false);
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 w-full"
      >
        <LogOut className="w-4 h-4" />
        <span>{t('abmelden')}</span>
      </button>
    </>
  );

  return (
    // --- MODIFIZIERTES NAV-ELEMENT ---
    // Fügt transition-transform, duration-300 und die translate-y Klassen hinzu
    <nav
      className={`sticky top-0 z-50 bg-white dark:bg-neutral-dark border-b border-slate-200 dark:border-slate-700 p-4 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
    {/* --- ENDE MODIFIZIERTES NAV-ELEMENT --- */}
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            Psychedu
          </Link>
          {/* Desktop Nav */}
          {user && (
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          {user ? (
            <>
              {/* Desktop Logout */}
              <button
                onClick={signOut}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('abmelden')}</span>
              </button>
              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          ) : (
            <Link href="/login" className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90">
              {t('anmelden')}
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && user && (
        <div className="md:hidden mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <nav className="flex flex-col gap-2">
            {renderNavLinks()}
          </nav>
        </div>
      )}
    </nav>
  );
}