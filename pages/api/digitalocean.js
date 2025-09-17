// pages/api/digitalocean.js
import { digitalOceanConfig } from '../../lib/settings';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, region, size, image } = req.body;

  if (!digitalOceanConfig.accessToken) {
    return res.status(500).json({ message: 'DigitalOcean token not configured.' });
  }

  try {
    const response = await fetch('https://api.digitalocean.com/v2/droplets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${digitalOceanConfig.accessToken}`,
      },
      body: JSON.stringify({
        name: name,
        region: region,
        size: size,
        image: image,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Droplet created successfully!', droplet: data.droplet });
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create droplet' });
  }
}

