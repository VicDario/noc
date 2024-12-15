import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entitity';
import { LogRepository } from '../../repositories/log.repository';
import { SendEmailLogs } from './send-email-logs';

describe('send-email-logs.ts', () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true),
  };

  const mockLogRepository: LogRepository = {
    getLogs: jest.fn(),
    saveLog: jest.fn(),
  };

  const senEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  test('should call send email and save logs', async () => {
    const destination = 'destination@email.com';

    const result = await senEmailLogs.execute(destination);

    expect(result).toBeTruthy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(destination);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: LogSeverityLevel.low,
      message: `Email log sent`,
      origin: 'send-email-logs.ts',
    });
  });

  test('should log in case of error', async () => {
    mockEmailService.sendEmailWithFileSystemLogs = jest.fn().mockResolvedValue(false)
    const destination = 'destination@email.com';

    const result = await senEmailLogs.execute(destination);

    expect(result).toBeFalsy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(destination);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: LogSeverityLevel.high,
      message: `Error: Email log not sent`,
      origin: 'send-email-logs.ts',
    });
  });
});
