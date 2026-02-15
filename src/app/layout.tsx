import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Ministère de la Sécurité Publique et de l\'Immigration - République du Tchad',
    template: '%s | MSPI - Tchad',
  },
  description: 'Site officiel du Ministère de la Sécurité Publique et de l\'Immigration de la République du Tchad',
  keywords: ['Tchad', 'MSPI', 'Sécurité', 'Immigration', 'Gouvernement'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${notoSansArabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
