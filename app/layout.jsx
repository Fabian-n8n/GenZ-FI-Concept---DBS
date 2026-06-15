import './globals.css';
import RouteTransition from '@/components/shell/RouteTransition';

export const metadata = {
  title: 'DBS Concept',
  description: 'Usability test prototype for DBS digibank Gen Z financial intelligence features',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DBS Concept',
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
      <body>
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}
