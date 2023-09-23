// Tailwind CSS imports
import "./globals.css";
// Types imports
import { siteConfig } from "@/config/siteConfig";

// Definition of the DefaultLayoutProps type that is used in the RootLayout function.
interface DefaultLayoutProps {
  children: React.ReactNode;
  session: any;
}

// Definition of the metadata for the site.
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS"],
  authors: [
    {
      name: "Lorenzo Crespan",
      url: "ADD_YOUR_URL_HERE",
    },
  ],
  creator: "Lorenzo Crespan",
  openGraph: {
    type: "website",
    locale: "it_IT",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
};

export default function BaseLayout({ children, session }: DefaultLayoutProps) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head />
        <body className="bg-background gbx-installed min-h-screen antialiased">
          {children}
        </body>
    </html>
  );
}
