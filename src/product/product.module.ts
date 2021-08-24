import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/product.entity';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { RestaurantSchema } from '../restaurant/entities/restaurant.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'product', schema: ProductSchema },{ name: 'Restaurant', schema: RestaurantSchema }])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
