// app/page.js
import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <Head>
        <title>Toko VPS Premium</title>
      </Head>

      <main className="text-center p-8">
        <h1 className="text-5xl font-extrabold mb-4">
          Selamat Datang di Toko VPS Premium
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Layanan VPS cepat, stabil, dan terpercaya.
        </p>
        <Link href="/order">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300">
            Pesan Sekarang
          </button>
        </Link>
      </main>
    </div>
  );
}

