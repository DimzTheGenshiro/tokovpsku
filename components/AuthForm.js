'use client';

import { useState } from 'react';

export default function AuthForm({ mode = 'login' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isRegisterMode = mode === 'register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const apiPath = isRegisterMode ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        // TODO: Arahkan ke halaman dashboard atau simpan token
      } else {
        setError(data.message || 'Terjadi kesalahan');
      }
    } catch (err) {
      setError('Gagal terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-gray-800 rounded-lg shadow-xl text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {isRegisterMode ? 'Daftar Akun Baru' : 'Masuk ke Akunmu'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegisterMode && (
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Alamat Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        {success && <div className="text-green-400 text-sm text-center">{success}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg font-bold text-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Memproses...' : (isRegisterMode ? 'Daftar' : 'Masuk')}
        </button>
      </form>

      <div className="mt-4 text-center">
        {isRegisterMode ? (
          <p className="text-gray-400">
            Sudah punya akun?{' '}
            <a href="/login" className="text-indigo-400 hover:underline">Masuk</a>
          </p>
        ) : (
          <p className="text-gray-400">
            Belum punya akun?{' '}
            <a href="/register" className="text-indigo-400 hover:underline">Daftar Sekarang</a>
          </p>
        )}
      </div>
    </div>
  );
}

