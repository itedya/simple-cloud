import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class ValidationExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (! Array.isArray(exception)) {
      super.catch(exception, host);
      return;
    }

    if (exception.length === 0) {
      super.catch(exception, host);
      return;
    }

    if (exception.filter(ele => ele instanceof ValidationError).length !== exception.length) {
      super.catch(exception, host);
      return;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const messages = [];

    exception.forEach(ele => {
      Object.values(ele.constraints).forEach(message => {
        messages.push(message);
      });
    });

    response.status(HttpStatus.BAD_REQUEST)
      .json({
        error: "Bad Request",
        message: messages,
        statusCode: HttpStatus.BAD_REQUEST
      });
  }
}
