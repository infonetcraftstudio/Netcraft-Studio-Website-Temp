import nodemailer from 'nodemailer';

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

const createTransporter = () => {
  const user = process.env.GMAIL_USER;
  const password = process.env.GMAIL_APP_PASSWORD;
  if (!user || !password) throw new Error('GMAIL_USER and GMAIL_APP_PASSWORD are required.');
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass: password }
  });
};

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let inquiry = request.body || {};
    if (typeof inquiry === 'string') {
      try {
        inquiry = JSON.parse(inquiry);
      } catch {
        return response.status(400).json({ error: 'Request body must be valid JSON.' });
      }
    }
    if (!inquiry || typeof inquiry !== 'object' || Array.isArray(inquiry)) {
      return response.status(400).json({ error: 'Request body must be a JSON object.' });
    }

    const name = String(inquiry.name || '').trim();
    const email = String(inquiry.email || '').trim();
    const message = String(inquiry.message || '').trim();
    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const safeName = escapeHtml(name);
    const company = escapeHtml(inquiry.company || 'Not provided');
    const service = escapeHtml(inquiry.service || 'Not specified');
    const safeMessage = escapeHtml(message);
    const date = escapeHtml(inquiry.date || new Date().toISOString());
    const reviewFor = escapeHtml(inquiry.reviewFor || service);
    const isReview = inquiry.type === 'client-review';
    const studioEmail = process.env.INQUIRY_TO_EMAIL || process.env.GMAIL_USER;
    if (!studioEmail) throw new Error('INQUIRY_TO_EMAIL or GMAIL_USER is required.');

    const subject = isReview
      ? `New client review for ${reviewFor}`
      : `New project enquiry from ${name}`;
    const details = `
      <p style="font-size:15px;line-height:1.7;margin:0 0 22px">A new ${isReview ? 'client review' : 'project enquiry'} was submitted through the website.</p>
      <div style="background:#f4f7fb;padding:18px 20px;margin-bottom:22px">
        <p style="margin:0 0 9px"><strong>From:</strong> ${safeName}</p>
        <p style="margin:0 0 9px"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:0 0 9px"><strong>Company:</strong> ${company}</p>
        <p style="margin:0 0 9px"><strong>${isReview ? 'Review for' : 'Requested service'}:</strong> ${isReview ? reviewFor : service}</p>
        <p style="margin:0"><strong>Received:</strong> ${date}</p>
      </div>
      <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#718096;margin:0 0 8px">${isReview ? 'Client Review' : 'Project Requirements'}</p>
      <p style="font-size:15px;line-height:1.8;margin:0;white-space:pre-wrap">${safeMessage}</p>
    `;
    const clientMessage = `
      <p style="font-size:17px;line-height:1.6;margin:0 0 16px">Hello ${safeName},</p>
      <p style="font-size:15px;line-height:1.8;margin:0 0 16px">Thank you for sharing your ${isReview ? `feedback on ${reviewFor}` : 'project requirements'} with NetCraft Studio.</p>
      <p style="font-size:15px;line-height:1.8;margin:0 0 24px">Your message is safely with our team. A senior studio partner will review it and get back to you shortly.</p>
      <div style="border-left:3px solid #2563eb;padding:12px 16px;background:#f4f7fb;font-size:14px;line-height:1.7">We appreciate the opportunity to build thoughtful digital work with you.</div>
    `;
    const transporter = createTransporter();
    const from = `NetCraft Studio <${process.env.GMAIL_USER}>`;

    await transporter.verify();

    await transporter.sendMail({
      from,
      to: studioEmail,
      replyTo: email,
      subject,
      html: emailLayout(isReview ? 'Client feedback' : 'New website enquiry', subject, details)
    });
    await transporter.sendMail({
      from,
      to: email,
      subject: 'Thank you for contacting NetCraft Studio',
      html: emailLayout('Message received', 'Thank you for reaching out.', clientMessage)
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Nodemailer delivery failed:', error);
    const message = error instanceof Error ? error.message : 'Unable to send enquiry email.';
    return response.status(500).json({ error: message });
  }
}
