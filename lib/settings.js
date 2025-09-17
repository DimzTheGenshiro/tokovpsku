// lib/settings.js

/**
 * Konfigurasi untuk aplikasi Toko VPS.
 * Simpan data sensitif di .env.local dan akses di sini.
 */
const isProduction = process.env.NODE_ENV === 'production';

// Konfigurasi Midtrans
export const midtransConfig = {
  isProduction: isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
};

// Konfigurasi DigitalOcean
export const digitalOceanConfig = {
  accessToken: process.env.DO_ACCESS_TOKEN,
};

// Konfigurasi Aplikasi
export const appConfig = {
  domain: isProduction ? 'https://your-domain.vercel.app' : 'http://localhost:3000',
};

