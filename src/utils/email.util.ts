import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOS,
  port: process.env.MAIL_PORT,
  secure: true,
  service: 'gmail',
  auth: {
    user: 'nullifycomp@gmail.com',
    pass: 'fzrfqahwhcslzkea',
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    const mailOptions = {
      from: 'أيجاري',
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
