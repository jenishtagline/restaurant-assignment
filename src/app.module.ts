import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RestaurantModule,
    ProductModule,
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
