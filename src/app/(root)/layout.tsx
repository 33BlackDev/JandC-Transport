import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'J y C Servicios 777',
  description: 'Fast and reliable shipping between the USA, Haiti, and the Dominican Republic',
  icons: {
    icon: '/images/black-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
