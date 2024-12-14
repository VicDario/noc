import { LogEntity } from '../../entities/log.entitity';
import { LogRepository } from '../../repositories/log.repository';
import { CheckMultipleService } from './check-multiple.service';

describe('checkService', () => {
  const mockLogRepository1: LogRepository = {
    getLogs: jest.fn(),
    saveLog: jest.fn(),
  };
  const mockLogRepository2: LogRepository = {
    getLogs: jest.fn(),
    saveLog: jest.fn(),
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();
  const checkMultipleService = new CheckMultipleService(
    [mockLogRepository1, mockLogRepository2],
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call successCallback when fetch returns true', async () => {
    const wasSuccess = await checkMultipleService.execute('https://google.com');

    expect(wasSuccess).toBeTruthy();
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
  });

  test('should call errorCallback when fetch returns false', async () => {
    const wasSuccess = await checkMultipleService.execute('http://localhost');

    expect(wasSuccess).toBeFalsy();
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
  });
});
