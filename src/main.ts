import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v2 } from 'cloudinary';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Cloudinary configuration
  v2.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    cloud_name: process.env.CLOUDINARY_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    api_key: process.env.API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    api_secret: process.env.API_SECRET,
  });
  await app.listen(3000);
}
bootstrap();