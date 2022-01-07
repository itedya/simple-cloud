import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { validateOrReject } from "class-validator";
import { ClassConstructor } from "class-transformer";

// slightly edited, but still - source: https://github.com/nestjs/nest/issues/4798#issuecomment-706176390
export const RequestHeaders = createParamDecorator(
  async (value: ClassConstructor<object>, ctx: ExecutionContext) => {
    // extract headers
    const headers = ctx.switchToHttp().getRequest().headers;

    // Convert headers to DTO object
    const dto = new value(headers);

    // Validate
    await validateOrReject(dto);

    // return header dto object
    return dto;
  },
);
