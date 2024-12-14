import { LogEntity, LogSeverityLevel } from './log.entitity';

describe('logEntity', () => {
  const logData = {
    level: LogSeverityLevel.high,
    message: 'test-message',
    origin: 'log.entity.ts',
  };

  test('should create logEntity instance', () => {
    const log = new LogEntity(logData);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(logData.message);
    expect(log.origin).toBe(logData.origin);
    expect(log.level).toBe(LogSeverityLevel.high);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create logEntity instance from json', () => {
    const json = `{
      "level": "low",
      "message": "test-message",
      "origin": "log.entity.ts",
      "createAt": "2024-12-14T02:57:27.740Z"
    }`;
    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('test-message');
    expect(log.origin).toBe('log.entity.ts');
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create logEntity instance from object', () => {
    const log = LogEntity.fromObject(logData);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(logData.message);
    expect(log.origin).toBe(logData.origin);
    expect(log.level).toBe(LogSeverityLevel.high);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
