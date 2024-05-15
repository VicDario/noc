import { LogEntity, LogSeverityLevel } from '../../entities/log.entitity';
import { LogRepository } from '../../repositories/log.repository';

interface CheckMultipleServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void;

export class CheckMultipleService implements CheckMultipleServiceUseCase {
  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

  private callLogsRepositories(log: LogEntity): void {
    this.logRepositories.forEach((logRepository) => {logRepository.saveLog(log)})
  }

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error on check service ${url}`);

      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts',
      });
      this.callLogsRepositories(log);
      this.successCallback?.();

      return response.ok;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts',
      });
      this.callLogsRepositories(log);
      this.errorCallback?.(errorMessage);

      return false;
    }
  }
}
