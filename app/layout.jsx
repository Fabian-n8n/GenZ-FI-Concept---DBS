import './globals.css';
import RouteTransition from '@/components/shell/RouteTransition';
import PasswordGate from '@/components/shell/PasswordGate';

export const metadata = {
  metadataBase: new URL('https://genz-fi-dbs.vercel.app'),
  title: 'DBS Concept',
  description: 'Usability test prototype for DBS digibank Gen Z financial intelligence features',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DBS Concept',
  },
  openGraph: {
    title: 'GenZ FI Concept — DBS digibank',
    description: 'Usability test prototype for DBS digibank Gen Z financial-intelligence features — Payday Lock & smart spend categorisation.',
    url: 'https://genz-fi-dbs.vercel.app',
    siteName: 'GenZ FI Concept',
    type: 'website',
    images: [{ url: '/assets/og/og-image.png', width: 1200, height: 630, alt: 'GenZ FI Concept — DBS digibank usability prototype' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenZ FI Concept — DBS digibank',
    description: 'Usability test prototype for DBS digibank Gen Z financial-intelligence features.',
    images: ['/assets/og/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FF0000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/assets/logo/dbs-mark-red.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ background: 'var(--color-bg)', position: 'relative' }}>
        <PasswordGate>
          <RouteTransition>{children}</RouteTransition>
        </PasswordGate>
      </body>
    </html>
  );
}
