import { createTransport } from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';

interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    // TODO; attachments
}

export class EmailService {
    private transporter = createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    })
    
    constructor() { }

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody } = options;
        try {
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
            });
            console.log(sendInformation);
            
            return true;
        } catch (error) {
            return false;
        }
    }
}