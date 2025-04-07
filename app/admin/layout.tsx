import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout CMS - Admin',
  description: 'Admin panel for the checkout page CMS',
};

export default function AdminLayout({
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