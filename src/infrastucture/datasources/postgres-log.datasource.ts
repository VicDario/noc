import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogModel } from '../../data/mongo';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import {
  LogEntity,
  LogSeverityLevel,
} from '../../domain/entities/log.entitity';

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity) {
    const level = severityEnum[log.level];
    const newLog = await prismaClient.log.create({
      data: {
        ...log,
        level,
      },
    });
    console.log('Mongo Log Created:', newLog.id);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];
    const logs = await prismaClient.log.findMany({ where: { level } });

    return logs.map(LogEntity.fromObject);
  }
}
