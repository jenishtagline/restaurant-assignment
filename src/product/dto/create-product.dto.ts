import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsNotEmpty()
  @IsString()
  readonly restaurantId: string;
}
