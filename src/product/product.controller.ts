import {
  Controller,
  Post,
  Delete,
  Put,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileName } from 'src/utils/file-upload';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  /*
      Add product
  */
  @Post('/create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: fileName,
      }),
    }),
  )
  createProduct(
    @UploadedFile() file,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.productService.createProduct(file, request, response);
  }


  /*
      Update product
  */
  @Put('/update')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: fileName,
      }),
    }),
  )
  updateProduct(
    @UploadedFile() file,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.productService.updateProduct(file, request, response);
  }

  /*
      Delete product
  */
  @Delete('/delete')
  deleteProduct(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.productService.deleteProduct(request, response);
  }
}
