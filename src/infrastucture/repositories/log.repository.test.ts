import { LogDataSource } from '../../domain/datasources/log.datasource';
import {
  LogEntity,
  LogSeverityLevel,
} from '../../domain/entities/log.entitity';
import { LogRepositoryImpl } from './log.repository';

describe('log.repository.ts', () => {
  const log = new LogEntity({
    level: LogSeverityLevel.low,
    message: 'TestLog',
    origin: 'log.repository.test.ts',
  });
  const mockdataSource: LogDataSource = {
    getLogs: jest.fn().mockResolvedValue([log]),
    saveLog: jest.fn(),
  };

  const repository = new LogRepositoryImpl(mockdataSource);

  test('saveLog should call datasource with arguments', () => {
    repository.saveLog(log);

    expect(mockdataSource.saveLog).toHaveBeenCalled();
    expect(mockdataSource.saveLog).toHaveBeenCalledWith(log);
  });

  test('getLogs should call datasource with level and return value', async () => {
    const result = await repository.getLogs(LogSeverityLevel.high);

    expect(result).toEqual([log]);
    expect(mockdataSource.getLogs).toHaveBeenCalled();
    expect(mockdataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.high);
  });
});
