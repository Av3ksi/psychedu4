
import { Geist } from "next/font/google";
import "../globals.css";
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import { AuthProvider } from '@/contexts/AuthContext';
import TopBar from '../../components/TopBar';
import ProtectedRoute from '@/contexts/ProtectedRoute';
import { Analytics } from "@vercel/analytics/react"
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
// import { PostHogProvider } from '@/contexts/PostHogContext';
// import { PostHogErrorBoundary } from '@/components/PostHogErrorBoundary';
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}
const geist = Geist({ subsets: ['latin'] });

export default async function LocaleLayout({ children , params }: LayoutProps<'/[locale]'>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
    // Enable static rendering
    setRequestLocale(locale);
  return (
    <html lang={locale} className="dark">
      <body className={geist.className}>
        <Analytics mode="auto" />
        <AuthProvider>   
            <NextIntlClientProvider>
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

