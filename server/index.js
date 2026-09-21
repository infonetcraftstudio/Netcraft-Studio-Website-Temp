import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = express();
const port = Number(process.env.PORT || 5173);

app.use(express.json({ limit: '100kb' }));

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const emailLayout = (eyebrow, title, content) => `
  <div style="background:#f4f7fb;padding:40px 16px;font-family:Arial,sans-serif;color:#162033">
    <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #dbe3ee">
      <div style="background:#10233f;padding:28px 32px;color:#fff">
        <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8ec5ff">NetCraft Studio</div>
        <h1 style="font-size:28px;line-height:1.2;margin:16px 0 0;font-weight:600">${title}</h1>
      </div>
      <div style="padding:30px 32px">
        <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#2563eb;margin-bottom:18px">${eyebrow}</div>
        ${content}
      </div>
      <div style="border-top:1px solid #e6ebf2;padding:18px 32px;color:#718096;font-size:12px">NetCraft Studio · Coimbatore, Tamil Nadu</div>
    </div>
  </div>
`;

app.post('/api/send-inquiry', async (request, response) => {
  const inquiry = request.body || {};
  const email = String(inquiry.email || '').trim();
  const name = escapeHtml(inquiry.name || 'there');
  const company = escapeHtml(inquiry.company || 'Not provided');
  const service = escapeHtml(inquiry.service || 'Not specified');
  const message = escapeHtml(inquiry.message || '');
  const date = escapeHtml(inquiry.date || new Date().toISOString());
  const isReview = inquiry.type === 'client-review';

  if (!email || !inquiry.message) {
    return response.status(400).json({ error: 'Email and message are required.' });
  }

  try {
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    const studioEmail = process.env.INQUIRY_TO_EMAIL || gmailUser;
    if (!gmailUser || !gmailPassword || !studioEmail) {
      return response.status(503).json({ error: 'Mail server is not configured.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPassword }
    });
    const subject = isReview
      ? `New client review for ${inquiry.reviewFor || inquiry.service || 'requested product'}`
      : `New project enquiry from ${inquiry.name || 'website visitor'}`;
    const details = `
      <p style="font-size:15px;line-height:1.7">A new ${isReview ? 'client review' : 'project enquiry'} was submitted.</p>
      <div style="background:#f4f7fb;padding:18px 20px">
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>${isReview ? 'Review for' : 'Requested service'}:</strong> ${service}</p>
        <p><strong>Received:</strong> ${date}</p>
      </div>
      <p style="font-size:15px;line-height:1.8;white-space:pre-wrap">${message}</p>
    `;
    const thankYou = `
      <p style="font-size:17px;line-height:1.6">Hello ${name},</p>
      <p style="font-size:15px;line-height:1.8">Thank you for sharing your ${isReview ? 'feedback' : 'project requirements'} with NetCraft Studio.</p>
      <p style="font-size:15px;line-height:1.8">Your message is safely with our team. A senior studio partner will review it and get back to you shortly.</p>
      <div style="border-left:3px solid #2563eb;padding:12px 16px;background:#f4f7fb">We appreciate the opportunity to build thoughtful digital work with you.</div>
    `;

    await transporter.sendMail({
      from: `NetCraft Studio <${gmailUser}>`,
      to: studioEmail,
      replyTo: email,
      subject,
      html: emailLayout(isReview ? 'Client feedback' : 'New website enquiry', subject, details)
    });
    await transporter.sendMail({
      from: `NetCraft Studio <${gmailUser}>`,
      to: email,
      subject: 'Thank you for contacting NetCraft Studio',
      html: emailLayout('Message received', 'Thank you for reaching out.', thankYou)
    });

    return response.json({ success: true });
  } catch (error) {
    console.error('Nodemailer delivery failed:', error);
    return response.status(500).json({ error: 'Unable to send enquiry email.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(rootDir, 'dist')));
  app.use((_request, response) => response.sendFile(path.join(rootDir, 'dist', 'index.html')));
} else {
  const vite = await createViteServer({ root: rootDir, server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
}

app.listen(port, () => console.log(`NetCraft Studio running at http://localhost:${port}`));
