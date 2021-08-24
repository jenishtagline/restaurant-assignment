import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RestaurantModel } from '../restaurant/entities/restaurant.model';
import { ProductSchema } from '../product/entities/product.entity';
import { Model } from 'mongoose';
import { profileUpload } from 'src/utils/file-upload';
import { Request, Response } from 'express';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Restaurant') private readonly restaurantModel: Model<RestaurantModel>,
    @InjectModel('product') private readonly productModel: Model<ProductSchema>,
  ) { }

  async createProduct(
    file,
    request: Request,
    response: Response,
  ) {
    try {
      const { name, price, category, restaurantId } = request.body

      if (!name) return response.status(400).json({ msg: 'Please add product name' });
      if (!price) return response.status(400).json({ msg: 'Please add product name' });
      if (!category) return response.status(400).json({ msg: 'Please add product category' });
      if (!restaurantId) return response.status(400).json({ msg: 'Please add restaurant id ' });

      const productData = {
        name,
        price,
        category,
        image: ''
      };

      if (file) {
        const imageFilePath = file.path;
        const imageData = await profileUpload(imageFilePath);
        productData.image = imageData;
      }

      const product = await this.productModel.create(productData);

      await this.restaurantModel.findByIdAndUpdate(restaurantId, { $push: { products: product._id } })
      return response
        .status(201)
        .json({ msg: 'Product added successfully', data: product });
    } catch (error) {

      return response.status(500)
        .json({ msg: 'Restaurant registration failed', err: error.message });
    }
  }

  async updateProduct(
    file,
    request: Request,
    response: Response,
  ) {
    try {

      const { name, price, category, id } = request.body

      if (!id)  return response.status(400).json({ msg: 'Please add product id' });

      if (!ObjectId.isValid(id)) return response.status(400).json({ msg: 'Invalid restaurant id' });
     

      //Check for product details
      const productDetails = await this.productModel.findById(id).lean();
      if (!productDetails) {
        return response.status(404).json({ msg: 'Product details not found' });
      }

      if (!name)  return response.status(400).json({ msg: 'Please add product name' })

      if (price && (price !== '' || price !== undefined)) {
        return response.status(400).json({ msg: 'Please add product price' });
      }

      if (category && (category !== '' || category !== undefined)) {
        return response.status(400).json({ msg: 'Please add product category' });
      }

      const productData = {
        name: name ? name : productDetails.name,
        price: price ? price : productDetails.price,
        category: category ? category : productDetails.category,
        image: file ? file : productDetails.image
      };

      if (file) {
        const imageFilePath = file.path;
        const imageData = await profileUpload(imageFilePath);
        productData.image = imageData;
      }

      const product = await this.productModel.findByIdAndUpdate(id, productData, { new: true });
      return response
        .status(201)
        .json({ msg: 'Product updated successfully', data: product });
    } catch (error) {
      return response.status(500)
        .json({ msg: 'Update product failed', err: error.message });
    }
  }

  async deleteProduct(request: Request, response: Response) {
    try {
      if (!request.body.productId) {
        return response.status(400).json({ msg: 'Please provide product Id' });
      }

      if (!request.body.restaurantId) {
        return response
          .status(400)
          .json({ msg: 'Please provide restaurant Id' });
      }

      await this.restaurantModel.findOneAndUpdate(
        { _id: request.body.restaurantId },
        { $pull: { products: request.body.productId } },
      );
      return response
        .status(200)
        .json({ msg: 'Product removed successfully' });
    } catch (e) {
      return response.status(500).json({
        msg: 'Something went wrong, please try again',
        err: e.message,
      });
    }
  }


}
