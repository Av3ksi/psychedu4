// app/[locale]/layout.tsx
import { Geist } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import RouteWrapper from "@/components/RouteWrapper";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const geist = Geist({ subsets: ["latin"] });

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error("Die Übersetzungsdatei (messages) konnte nicht geladen werden:", error);
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className="dark">
      <body className={geist.className}>
        <Analytics mode="auto" />
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <RouteWrapper>
              {children}
            </RouteWrapper>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}