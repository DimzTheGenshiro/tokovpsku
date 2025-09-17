// components/VPSCarousel.js
import { useState } from 'react';

const plans = [
  { id: 1, ram: '2 GB', cpu: '1 Core', storage: '25 GB SSD', price: 'Rp 50.000', priceRaw: 50000 },
  { id: 2, ram: '4 GB', cpu: '2 Core', storage: '50 GB SSD', price: 'Rp 100.000', priceRaw: 100000 },
  { id: 3, ram: '8 GB', cpu: '4 Core', storage: '100 GB SSD', price: 'Rp 200.000', priceRaw: 200000 },
  { id: 4, ram: '16 GB', cpu: '4 Core', storage: '200 GB SSD', price: 'Rp 400.000', priceRaw: 400000 },
];

export default function VPSCarousel({ onSelectPlan }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index) => {
    setActiveIndex(index);
    onSelectPlan(plans[index]);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex justify-center items-center space-x-4 py-8">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            onClick={() => handleSelect(index)}
            className={`
              relative w-64 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
              ${activeIndex === index ? 'border-indigo-500 transform scale-105 shadow-xl' : 'border-gray-700 hover:border-indigo-400'}
            `}
          >
            <h3 className="text-2xl font-semibold text-center mb-2">{plan.ram} RAM</h3>
            <p className="text-gray-400 text-center">{plan.cpu} • {plan.storage}</p>
            <div className="flex flex-col items-center mt-4">
              <span className="text-4xl font-bold text-indigo-400">{plan.price}</span>
              <span className="text-sm text-gray-500">/ bulan</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

