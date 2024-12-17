import { createTransport, Transporter } from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export interface MailerOptions {
  service: string;
  mailerEmail: string;
  mailerSecretKey: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor(options: MailerOptions) {
    const { service, mailerEmail, mailerSecretKey } = options
    this.transporter = createTransport({
      service: service,
      auth: {
        user: mailerEmail,
        pass: mailerSecretKey,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del servidor';
    const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>Lorem Ipsum</p>
        `;
    const attachments: Attachment[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
    ];

    return await this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
