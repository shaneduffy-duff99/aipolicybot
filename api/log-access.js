// api/log-access.js
// Vercel serverless function — logs access code usage to Vercel KV or a simple JSON store

export default function handler(req, res) {
// Allow CORS from your domain
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) {
return res.status(200).end();
}

if (req.method !== ‘POST’) {
return res.status(405).json({ error: ‘Method not allowed’ });
}

const { code, label } = req.body;

// Get existing logs from environment or start fresh
// Logs are stored in Vercel’s edge config / we print to console for now
// which appears in Vercel’s function logs dashboard
const entry = {
code:      code || ‘unknown’,
label:     label || ‘unknown’,
time:      new Date().toISOString(),
ip:        req.headers[‘x-forwarded-for’] || req.socket?.remoteAddress || ‘unknown’,
userAgent: req.headers[‘user-agent’] || ‘unknown’,
referer:   req.headers[‘referer’] || ‘direct’
};

// Log to Vercel function logs (visible in Vercel dashboard → Functions → Logs)
console.log(‘MYPOLI_ACCESS:’, JSON.stringify(entry));

return res.status(200).json({ ok: true });
}
