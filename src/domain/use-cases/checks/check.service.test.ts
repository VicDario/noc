import { before } from 'node:test';
import { LogEntity } from '../../entities/log.entitity';
import { LogRepository } from '../../repositories/log.repository';
import { CheckService } from './check.service';

describe('checkService', () => {
  const mockLogRepository: LogRepository = {
    getLogs: jest.fn(),
    saveLog: jest.fn(),
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();
  const checkService = new CheckService(
    mockLogRepository,
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call successCallback when fetch returns true', async () => {
    const wasSuccess = await checkService.execute('https://google.com');

    expect(wasSuccess).toBeTruthy();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
  });

  test('should call errorCallback when fetch returns false', async () => {
    const wasSuccess = await checkService.execute('http://localhost');

    expect(wasSuccess).toBeFalsy();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
  });
});
