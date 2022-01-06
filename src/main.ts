import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ValidationExceptionFilter } from "./exception-filters/validation-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ValidationExceptionFilter(httpAdapter));

  app.enableCors();
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}

bootstrap();
