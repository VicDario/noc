import { CheckMultipleService } from '../domain/use-cases/checks/check-multiple.service';
import { FileSystemDataSource } from '../infrastucture/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastucture/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrastucture/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastucture/repositories/log.repository';
import { CronService } from './cron/cron.service';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgreLogRepository = new LogRepositoryImpl(new PostgresLogDataSource());


export class Server {
  public static start() {
    console.log('Server started');

    const url = 'https://gsadsadvdcxsd.com';
    CronService.createJob('*/5 * * * * *', () => {
      new CheckMultipleService([
        fsLogRepository,
        mongoLogRepository,
        postgreLogRepository,
      ]).execute(url);
    });
  }
}
