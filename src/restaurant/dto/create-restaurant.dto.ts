import { IsNotEmpty, IsString, } from 'class-validator';

export class CreateRestaurantDto {
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
