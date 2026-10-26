import sharp from 'sharp';

const overlay = Buffer.from(`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#073f3a" stop-opacity=".92"/>
      <stop offset=".55" stop-color="#0b6057" stop-opacity=".58"/>
      <stop offset="1" stop-color="#073f3a" stop-opacity=".15"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <rect x="72" y="76" width="92" height="5" rx="2.5" fill="#d6b98d"/>
  <text x="72" y="138" fill="#f6f2eb" font-family="Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="4">PRÉ-LANÇAMENTO</text>
  <text x="72" y="226" fill="#ffffff" font-family="Arial, sans-serif" font-size="62" font-weight="300" letter-spacing="-1">Uma nova experiência</text>
  <text x="72" y="292" fill="#ffffff" font-family="Arial, sans-serif" font-size="62" font-weight="300" letter-spacing="-1">CEVECON.</text>
  <text x="72" y="554" fill="#f6f2eb" font-family="Arial, sans-serif" font-size="22" font-weight="600">Canasvieiras · Florianópolis, SC</text>
</svg>`);

await sharp('public/canasvieiras-completa.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .composite([{ input: overlay }])
  .jpeg({ quality: 86, progressive: true })
  .toFile('public/social-preview.jpg');
