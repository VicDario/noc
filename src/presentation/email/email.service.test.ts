import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';
import { EmailService, MailerOptions, SendMailOptions } from './email.service';

describe('email.service.ts', () => {
  const mockSendEmail = jest.fn();

  //Mock transport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEmail,
  });

  const mailerOptions: MailerOptions = {
    mailerEmail: envs.MAILER_EMAIL,
    mailerSecretKey: envs.MAILER_SECRET_KEY,
    service: 'emailServiceTest',
  };
  const emailService = new EmailService(mailerOptions);

  beforeEach(() => jest.clearAllMocks());

  test('should send email', async () => {
    const options: SendMailOptions = {
      to: 'email@test.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>',
    };
    const emailSent = await emailService.sendEmail(options);

    expect(mockSendEmail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: '<h1>Test</h1>',
      subject: 'Test',
      to: 'email@test.com',
    });
    expect(emailSent).toBeTruthy();
  });

  test('should send email with attachments', async () => {
    await emailService.sendEmailWithFileSystemLogs('test@email.com');

    expect(mockSendEmail).toHaveBeenCalledWith({
      html: expect.any(String),
      subject: 'Logs del servidor',
      to: 'test@email.com',
      attachments: expect.arrayContaining([
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      ]),
    });
  });

  test('should return false in case of error', async () => {
    mockSendEmail.mockRejectedValue(new Error());
    const options: SendMailOptions = {
      to: 'email@test.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>',
    };

    const emailSent = await emailService.sendEmail(options);

    expect(emailSent).toBeFalsy();
  });
});
