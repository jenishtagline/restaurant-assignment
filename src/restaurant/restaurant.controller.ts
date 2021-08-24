import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { fileName } from '../utils/file-upload';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('/register')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        filename: fileName,
      }),
    }),
  )
  restaurantRegister(
    @UploadedFile() file,
    // @Body(new ValidationPipe()) data: CreateRestaurantDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.restaurantService.registerRestaurant(file, request, response);
  }

  @Get('/products')
  findAllProducts(@Req() request: Request, @Res() response: Response) {
    return this.restaurantService.findAllProducts(request, response);
  }

  @Get('/list')
  findAllRestaurants(@Req() request: Request, @Res() response: Response) {
    return this.restaurantService.findAllRestaurants(request, response);
  }

  //Update restaurant controller
  @Put('/update')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        filename: fileName,
      }),
    }),
  )
  updateRestaurant(
    @UploadedFile() file,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.restaurantService.updateRestaurantService(
      file,
      request,
      response,
    );
  }
}
