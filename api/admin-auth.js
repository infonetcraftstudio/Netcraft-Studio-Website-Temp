export default function adminAuth(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();
  if (!configuredPassword) {
    return response.status(500).json({ error: 'Admin authentication is not configured.' });
  }

  const passcode = typeof request.body?.passcode === 'string' ? request.body.passcode : '';
  const isValid = passcode.length > 0 && passcode === configuredPassword;

  if (!isValid) {
    return response.status(401).json({ error: 'Invalid admin passcode.' });
  }

  return response.status(200).json({ authenticated: true });
}
