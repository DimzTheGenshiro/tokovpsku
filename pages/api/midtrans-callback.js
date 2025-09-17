// pages/api/midtrans-callback.js
import midtransClient from 'midtrans-client';
import { midtransConfig } from '../../lib/settings';

export default async function handler(req, res) {
  const { order_id } = req.body;

  let apiClient = new midtransClient.CoreApi(midtransConfig);

  try {
    const statusResponse = await apiClient.transaction.notification(req.body);

    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
      if (fraudStatus === 'accept') {
        console.log(`Payment successful for order ID: ${order_id}`);

        // TODO: Simpan status pesanan di database
        // updateOrderStatus(order_id, 'Pembayaran Berhasil');

        // Panggil API DigitalOcean untuk membuat VPS
        try {
          const doResponse = await fetch('http://localhost:3000/api/digitalocean', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: `vps-${order_id}`, 
              region: 'sgp1', // Contoh: Singapore
              size: 's-1vcpu-2gb', // Contoh: sesuai dengan paket
              image: 'ubuntu-20-04-x64', // Contoh: Ubuntu
            }),
          });
          const doData = await doResponse.json();
          console.log('DigitalOcean API Response:', doData);
          // TODO: Update status pesanan di database menjadi "VPS Sedang Dibuat"

        } catch (doError) {
          console.error('Failed to create Droplet:', doError.message);
          // TODO: Update status pesanan di database menjadi "Gagal membuat VPS"
        }
      }
    } else if (transactionStatus === 'deny' || transactionStatus === 'cancel') {
      console.log(`Payment denied/canceled for order ID: ${order_id}`);
      // TODO: Update status pesanan di database menjadi "Pembayaran Gagal/Dibatalkan"
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing Midtrans callback:', error.message);
    res.status(500).send('Error');
  }
}

