import './globals.css';
import Script from 'next/script'; // Import Script component dari Next.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Toko VPS Keren',
  description: 'Toko VPS digital Ocean dengan UI Premium.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Menggunakan Next.js Script component untuk Midtrans */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}

