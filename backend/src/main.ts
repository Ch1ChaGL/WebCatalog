import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  const port = process.env.PORT || 5001;

  await app.listen(port, () => console.log(`server start on ${port}`));
}
bootstrap();
