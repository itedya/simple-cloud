import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (! Array.isArray(exception)) return exception;
    if (exception.length === 0) return exception;
    if (exception.filter(ele => ele instanceof ValidationError).length !== exception.length) return exception;

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
