// pages/api/create-vps.js
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, plan, region, paymentId } = req.body;

  try {
    // Logika untuk membuat VPS (dari langkah sebelumnya, kita pakai dummy)
    // Kita akan kirim IP dan password dummy ke email
    const vpsDetails = {
      ip: '103.20.200.10',
      password: 'password_dummy',
      hostname: 'vps-dummy-hostname',
    };

    // Kirim email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Detail VPS Anda',
      html: `
        <h1>Terima kasih telah membeli VPS!</h1>
        <p>Berikut adalah detail VPS Anda:</p>
        <ul>
          <li><strong>IP Address:</strong> ${vpsDetails.ip}</li>
          <li><strong>Password:</strong> ${vpsDetails.password}</li>
          <li><strong>Hostname:</strong> ${vpsDetails.hostname}</li>
          <li><strong>Plan:</strong> ${plan}</li>
          <li><strong>Region:</strong> ${region}</li>
          <li><strong>ID Pembayaran:</strong> ${paymentId}</li>
        </ul>
        <p>Silakan simpan informasi ini dengan baik.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'VPS berhasil dibuat dan detail dikirim ke email.' });

  } catch (error) {
    console.error('Error saat membuat VPS atau mengirim email:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memproses pesanan.' });
  }
}

