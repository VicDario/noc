import { envs } from '../config/plugins/env.plugin';
import { CheckService } from '../domain/use-cases/checks/check.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastucture/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastucture/repositories/log.repository';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);
const sendEmailLogs = new SendEmailLogs(
  new EmailService({
    service: envs.MAILER_SERVICE,
    mailerEmail: envs.MAILER_EMAIL,
    mailerSecretKey: envs.MAILER_SECRET_KEY,
  }),
  fileSystemLogRepository
);

export class Server {
  public static start() {
    console.log('Server started');

    /* sendEmailLogs
      .execute('dariocontrerasfc@gmail.com'); */

    const url = 'http://localhost';
    CronService.createJob('*/5 * * * * *', () => {
      new CheckService(
        fileSystemLogRepository,
        () => console.log('success'),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
