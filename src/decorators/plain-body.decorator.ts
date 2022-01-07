import * as rawbody from "raw-body";
import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

export const PlainBody = createParamDecorator(
  async (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (request.readable) {
      return (await rawbody(request));
    }

    throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
  });
