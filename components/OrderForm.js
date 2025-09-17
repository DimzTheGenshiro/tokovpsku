// components/OrderForm.js
'use client';

import { useState } from 'react';

const osOptions = ['Ubuntu', 'CentOS', 'Debian'];
const regionOptions = ['Singapore', 'New York', 'Frankfurt'];

export default function OrderForm({ selectedPlan }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan }),
      });

      const data = await response.json();

      if (response.ok) {
        // Jika berhasil, panggil Midtrans Snap
        window.snap.pay(data.token, {
          onSuccess: function(result) {
            alert("Pembayaran Berhasil!");
            console.log(result);
            // TODO: Redirect ke halaman status pesanan
          },
          onPending: function(result) {
            alert("Menunggu Pembayaran...");
            console.log(result);
          },
          onError: function(result) {
            alert("Pembayaran Gagal!");
            console.log(result);
          },
        });
      } else {
        throw new Error(data.message || 'Gagal membuat transaksi.');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-gray-800 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6">Detail Pemesanan</h2>

      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-400">Paket Terpilih:</p>
        <p className="text-xl font-semibold">{selectedPlan.ram} RAM • {selectedPlan.cpu}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Pilih OS</label>
          <select className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500 focus:border-indigo-500">
            {osOptions.map(os => <option key={os} value={os}>{os}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Pilih Region</label>
          <select className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500 focus:border-indigo-500">
            {regionOptions.map(region => <option key={region} value={region}>{region}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Minimal 8 karakter, 1 huruf besar, 1 angka, 1 simbol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleBuy}
        disabled={isLoading}
        className="w-full py-4 rounded-lg font-bold text-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Memproses...' : 'Beli Sekarang'}
      </button>
    </div>
  );
}

