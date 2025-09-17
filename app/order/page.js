// app/order/page.js
'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

// Import the Midtrans script, this must be done in a client component
const MidtransScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
};

export default function OrderPage() {
  const [email, setEmail] = useState(''); // <-- Tambahkan state untuk email
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('vps-standard');

  const router = useRouter();

  const plans = [
    { id: 'vps-standard', name: 'VPS Standard', price: 50000, description: '1 vCPU, 1 GB RAM, 25 GB SSD' },
    { id: 'vps-pro', name: 'VPS Pro', price: 100000, description: '2 vCPU, 2 GB RAM, 50 GB SSD' },
  ];

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan);

  const handleOrder = async () => {
    setIsLoading(true);
    setError(null);

    // Validasi email sederhana
    if (!email) {
      setError('Email harus diisi.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: `order-${Date.now()}`,
          grossAmount: selectedPlanDetails.price,
          itemName: selectedPlanDetails.name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        window.snap.pay(data.token, {
          onSuccess: async (result) => {
            // Logika setelah pembayaran berhasil
            const vpsResponse = await fetch('/api/create-vps', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email, // <-- Kirim email ke API
                plan: selectedPlanDetails.id,
                region: 'sgp1', // Contoh: Singapura
                paymentId: result.transaction_id,
              }),
            });
            const vpsData = await vpsResponse.json();
            if (vpsResponse.ok) {
              alert(vpsData.message);
              router.push('/');
            } else {
              setError(vpsData.message);
            }
          },
          onPending: (result) => {
            alert("Pembayaran tertunda. Silakan selesaikan pembayaran.");
          },
          onError: (result) => {
            alert("Pembayaran gagal.");
            console.error(result);
          },
          onClose: () => {
            alert('Anda menutup popup pembayaran.');
          }
        });
      } else {
        setError(data.message || 'Gagal membuat token pembayaran.');
      }
    } catch (err) {
      console.error(err);
      setError('Gagal terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <Head>
        <title>Pesan VPS</title>
      </Head>
      <MidtransScript />

      <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Pesan VPS</h1>
        {error && <div className="text-red-400 text-center mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Pilih Plan VPS</label>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          >
            {plans.map(plan => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - Rp{plan.price.toLocaleString('id-ID')}
              </option>
            ))}
          </select>
        </div>

        {/* Tambahkan input email di sini */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email Anda</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="masukkan email Anda"
            required
          />
        </div>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold">{selectedPlanDetails.name}</h3>
          <p className="text-gray-400">{selectedPlanDetails.description}</p>
          <p className="text-4xl font-extrabold mt-2">Rp{selectedPlanDetails.price.toLocaleString('id-ID')}</p>
        </div>

        <button
          onClick={handleOrder}
          disabled={isLoading}
          className="w-full py-3 rounded-lg font-bold text-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Memuat...' : 'Bayar Sekarang'}
        </button>
      </div>
    </div>
  );
}

