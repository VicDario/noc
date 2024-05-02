import { CheckService } from '../domain/use-cases/checks/check.service';
import { FileSystemDataSource } from '../infrastucture/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastucture/repositories/log.repository';
import { CronService } from './cron/cron.service';

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {
  public static start() {
    console.log('Server started');
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
