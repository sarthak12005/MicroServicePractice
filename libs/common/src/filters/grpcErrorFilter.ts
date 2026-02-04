import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GrpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception?.code !== undefined) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = exception.details || 'Internal server error';

      switch (exception.code) {
        case 3:
          status = HttpStatus.BAD_REQUEST;
          break;
        case 5:
          status = HttpStatus.NOT_FOUND;
          break;
        case 6:
          status = HttpStatus.CONFLICT;
          break;
        case 7:
          status = HttpStatus.FORBIDDEN;
          break;
        case 16:
          status = HttpStatus.UNAUTHORIZED;
          break;
      }

      return response.status(status).json({
        statusCode: status,
        message,
        error: HttpStatus[status],
      });
    }

    // fallback
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: 'InternalServerError',
    });
  }
}
