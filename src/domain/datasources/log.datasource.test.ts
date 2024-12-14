import { LogEntity, LogSeverityLevel } from "../entities/log.entitity";
import { LogDataSource } from "./log.datasource";

describe('log.datasource.ts', () => {
  const newLog = new LogEntity({
    message: 'Log-test',
    origin: 'log.datasource.ts',
    level: LogSeverityLevel.low
  });
  
  class MockLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test('should test the abstract class', () => {
    const mockLogDatasource = new MockLogDatasource();
    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(mockLogDatasource).toHaveProperty('saveLog');
    expect(mockLogDatasource).toHaveProperty('getLogs');
  });
})
