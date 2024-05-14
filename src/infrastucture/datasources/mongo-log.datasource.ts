import { LogModel } from '../../data/mongo';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entitity';

export class MongoLogDataSource implements LogDataSource {

  async saveLog(log: LogEntity) {
    const newLog = await LogModel.create(log);
    console.log('Mongo Log Created:', newLog.id);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel });

    return logs.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
  
}
