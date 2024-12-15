import { envs } from '../../config/plugins/env.plugin';
import { LogModel, MongoDatabase } from '../../data/mongo';
import mongoose from 'mongoose';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entitity';
import { MongoLogDataSource } from './mongo-log.datasource';

describe('mongo-log.datasource.ts', () => {
  beforeAll(() => {
    MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  const logDataSource = new MongoLogDataSource();
  const log = new LogEntity({
    message: 'test-message',
    origin: 'mongo-log.datasource.test.ts',
    level: LogSeverityLevel.low
  });

  test('should create log', async () => {
    const logSpy = jest.spyOn(console, 'log');
    
    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Mongo Log Created", expect.any(String));
  })

  test('should get logs', async () => {
    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.low);

    expect(logs.length).toBe(2);
    logs.forEach((log) => expect(log.level).toBe(LogSeverityLevel.low));
  })
});
