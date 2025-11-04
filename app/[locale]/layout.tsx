import { Geist } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AuthProvider } from "@/contexts/AuthContext";
import TopBar from "../../components/TopBar";
import ProtectedRoute from "@/contexts/ProtectedRoute";
import { Analytics } from "@vercel/analytics/react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Script from "next/script";

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

  // JSON-Übersetzungen manuell laden
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error("Die Übersetzungsdatei (messages) konnte nicht geladen werden:", error);
    notFound();
  }

  // Locale für statisches Rendering setzen
  setRequestLocale(locale);

  return (
    <html lang={locale} className="dark">
      <head>
        {/* --- Botpress Chatbot Integration --- */}
        <Script
          src="https://cdn.botpress.cloud/webchat/v3.3/inject.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://files.bpcontent.cloud/2025/11/03/19/20251103190902-64ZUPOTP.js"
          strategy="afterInteractive"
          defer
        />
      </head>


      <body className={geist.className}>
        <Analytics mode="auto" />

        <AuthProvider>
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
