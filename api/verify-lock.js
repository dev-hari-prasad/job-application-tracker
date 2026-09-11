module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-lock-passcode');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const configuredLock = process.env.LOCK ? process.env.LOCK.trim() : '';

  // If no LOCK is set on server, always unlocked
  if (!configuredLock) {
    return res.status(200).json({ locked: false, valid: true });
  }

  // If LOCK is set, verify incoming passcode
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const userPasscode = (
    req.headers['x-lock-passcode'] || 
    body.passcode || 
    (req.query && req.query.lock) || 
    ''
  ).trim();

  if (userPasscode === configuredLock) {
    return res.status(200).json({ locked: true, valid: true });
  } else {
    return res.status(401).json({ locked: true, valid: false, error: 'Incorrect passcode' });
  }
};
