import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly picture: string;
}
