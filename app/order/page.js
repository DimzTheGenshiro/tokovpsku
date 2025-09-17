'use client';

import { useState } from 'react';
import VPSCarousel from '../../components/VPSCarousel';
import OrderForm from '../../components/OrderForm';

export default function OrderPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Pilih Paket VPS</h1>

        {/* Komponen Pilihan Paket VPS (Carousel) */}
        <VPSCarousel onSelectPlan={setSelectedPlan} />

        {/* Komponen Form Pemesanan */}
        {selectedPlan && (
          <OrderForm selectedPlan={selectedPlan} />
        )}
      </main>
    </div>
  );
}

