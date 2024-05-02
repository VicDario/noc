import { LogEntity, LogSeverityLevel } from '../../entities/log.entitity';
import { LogRepository } from '../../repositories/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error on check service ${url}`);

      const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
      this.logRepository.saveLog(log);
      this.successCallback?.();
      return response.ok;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity(errorMessage, LogSeverityLevel.high);
      this.logRepository.saveLog(log);
      this.errorCallback?.(errorMessage);
      return false;
    }
  }
}
