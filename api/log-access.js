// api/log-access.js
module.exports = function handler(req, res) {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) {
return res.status(200).end();
}

if (req.method !== ‘POST’) {
return res.status(405).json({ error: ‘Method not allowed’ });
}

try {
var body = req.body || {};
var entry = {
code:      body.code || ‘unknown’,
label:     body.label || ‘unknown’,
time:      new Date().toISOString(),
ip:        req.headers[‘x-forwarded-for’] || ‘unknown’,
device:    req.headers[‘user-agent’] || ‘unknown’
};

```
// Logs appear in Vercel → Observability → Functions → log-access → Compute tab
console.log('MYPOLI_ACCESS ' + JSON.stringify(entry));

return res.status(200).json({ ok: true });
```

} catch(e) {
return res.status(500).json({ error: e.message });
}
};
