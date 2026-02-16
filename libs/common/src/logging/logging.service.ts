import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  info(msg: string, meta?: any) {
    this.logger.info(msg, meta);
  }

  error(msg: string, meta?: any) {
    this.logger.error(msg, meta);
  }
}
