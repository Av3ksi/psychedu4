import { Geist } from "next/font/google";
import "../globals.css";
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
// NICHT getMessages importieren, wir laden manuell
import { AuthProvider } from '@/contexts/AuthContext';
import TopBar from '../../components/TopBar';
import ProtectedRoute from '@/contexts/ProtectedRoute';
import { Analytics } from "@vercel/analytics/react"
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}
const geist = Geist({ subsets: ['latin'] });

export default async function LocaleLayout({ children , params }: LayoutProps<'/[locale]'>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // 1. MANUELLES LADEN DER NACHRICHTEN
  // Wir umgehen getMessages() und laden die JSON-Datei direkt.
  let messages;
  try {
    // Der Pfad ist relativ zu DIESER layout.tsx Datei
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error("Die Übersetzungsdatei (messages) konnte nicht geladen werden:", error);
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} className="dark">
      <body className={geist.className}>
        <Analytics mode="auto" />
        <AuthProvider>   
            {/* 2. NACHRICHTEN AN DEN PROVIDER ÜBERGEBEN */}
            {/* Alle Client-Komponenten (wie deine Modul-Seiten) erhalten jetzt die Übersetzungen */}
            <NextIntlClientProvider messages={messages}>
          <ProtectedRoute>
            <TopBar />    
            <main>{children}</main>
          </ProtectedRoute>
            </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}