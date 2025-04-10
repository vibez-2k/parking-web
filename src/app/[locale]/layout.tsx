import { Manrope, Source_Sans_3 } from "next/font/google";

import { routing } from "@/i18n/routing";

import { ThemeProvider } from "@/components/themes/theme-provider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserStoreInitializer } from "@/components/hydration";

const manrope = Manrope({ subsets: ["latin"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  // Load translations
  const t = await getTranslations({ locale });

  return {
    title: t("meta.title"), // Fixed: Use "meta.title" instead of just "title"
    description: t("meta.description"), // Fixed: Use "meta.description"
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.className} ${sourceSans.className} antialiased`}
      >
        <main>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              <UserStoreInitializer children={children}></UserStoreInitializer>
              <Toaster />
            </NextIntlClientProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
