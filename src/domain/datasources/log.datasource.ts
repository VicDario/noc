import { LogEntity, LogSeverityLevel } from "../entities/log.entitity";

export abstract class LogDataSource {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
// To use an abstract class the class that will use it must implement every method that the abstract class has.
// abstract classes are used to define a contract that the class that will use it must follow.
// Abstract avoid initialization of the class.