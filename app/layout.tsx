import './globals.css';
import type { Metadata } from 'next';

// This will be overridden by CMS settings
export const metadata: Metadata = {
  title: 'Payment Checkout',
  description: 'Secure payment checkout page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 