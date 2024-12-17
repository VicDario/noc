import { rmSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import {
  LogEntity,
  LogSeverityLevel,
} from '../../domain/entities/log.entitity';
import { log } from 'console';

describe('file-system.datasource.ts', () => {
  const logPath = path.join(__dirname, '../../../logs');

  beforeEach(() => {
    rmSync(logPath, { recursive: true, force: true });
  });

  test('should create log files if they do not exist', () => {
    new FileSystemDataSource();

    const files = readdirSync(logPath);

    expect(files).toStrictEqual([
      'logs-all.log',
      'logs-high.log',
      'logs-medium.log',
    ]);
  });

  test('should save logs in logs-all.log', async () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      message: 'Test message',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.tests.ts',
    });

    await logDataSource.saveLog(log);
    const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test('should save logs in logs-all.log and logs-medium.log', async () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      message: 'Test message medium level',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.tests.ts',
    });

    await logDataSource.saveLog(log);
    const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const mediumLogs = readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test('should save logs in logs-all.log and logs-high.log', async () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      message: 'Test message high level',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.tests.ts',
    });

    await logDataSource.saveLog(log);
    const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const highLogs = readFileSync(`${logPath}/logs-high.log`, 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test('should return all logs', async () => {
    const logDataSource = new FileSystemDataSource();
    const lowLog = new LogEntity({
      message: 'Test message low level',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.tests.ts',
    });
    const mediumLog = new LogEntity({
      message: 'Test message medium level',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.tests.ts',
    });
    const highLog = new LogEntity({
      message: 'Test message high level',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.tests.ts',
    });

    await logDataSource.saveLog(lowLog);
    await logDataSource.saveLog(mediumLog);
    await logDataSource.saveLog(highLog);

    const lowLogs = await logDataSource.getLogs(LogSeverityLevel.low);
    const mediumLogs = await logDataSource.getLogs(LogSeverityLevel.medium);
    const highLogs = await logDataSource.getLogs(LogSeverityLevel.high);

    expect(lowLogs).toEqual(
      expect.arrayContaining([lowLog, mediumLog, highLog])
    );
    expect(mediumLogs).toEqual(expect.arrayContaining([mediumLog]));
    expect(highLogs).toEqual(expect.arrayContaining([highLog]));
  });

  test('should not throw an error if path exist', () => {
    new FileSystemDataSource();
    new FileSystemDataSource();
  });

  test('should not throw an error if log file is empty', async () => {
    const logDataSource = new FileSystemDataSource();
    const logs = await logDataSource.getLogs(LogSeverityLevel.low);

    expect(logs).toEqual([]);
  });

  test('should thrown an error if severity level is no defined', () => {
    const logDataSource = new FileSystemDataSource();
    const severityLevel = 'undefined_level' as LogSeverityLevel;

    expect(logDataSource.getLogs(severityLevel)).rejects.toThrow(
      `${severityLevel} not implemented`
    );
  });
});
