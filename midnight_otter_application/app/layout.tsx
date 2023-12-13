// Tailwind CSS imports
import "./globals.css";
// Types imports
import { siteConfig } from "@/config/siteConfig";
import { Web3Modal } from "@/context/Web3Modal";

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
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  );
}
