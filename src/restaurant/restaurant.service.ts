import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RestaurantModel } from './entities/restaurant.model';
import { Response, Request } from 'express';
import { profileUpload } from '../utils/file-upload';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<RestaurantModel>,
  ) { }

  /*
      Register restaurant service
  */
  registerRestaurant = async (file, request: Request, response: Response) => {
    try {
      const { name, address } = request.body;

      if (!name) {
        return response.status(400).json({ msg: 'Please add restaurant name' });
      }

      if (!request.body.openingHours.length) {
        return response
          .status(400)
          .json({ msg: 'Please add restaurant opening hours' });
      }
      const restaurantData = {
        name,
        address,
        openingHours: request.body.openingHours,
        picture: '',
      };
      if (file) {
        const imageFilePath = file.path;
        const imageData = await profileUpload(imageFilePath);
        restaurantData.picture = imageData;
      }

      if (restaurantData.openingHours.length) {
        for (let k = 0; k < restaurantData.openingHours.length; k++) {
          restaurantData.openingHours[k] = JSON.parse(
            restaurantData.openingHours[k],
          );
        }
      }

      const restaurant = await this.restaurantModel.create(restaurantData);
      return response
        .status(201)
        .json({ msg: 'Restaurant registered successfully', data: restaurant });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: 'Restaurant registration failed', err: error.message });
    }
  };

  async findAllProducts(request: Request, response: Response) {
    try {
      if (!request.query.restaurantId) {
        return response.status(400).json({ msg: 'Please add restaurant id' });
      }


      const restaurant = await this.restaurantModel
        .findById(request.query.restaurantId)
        .populate({ path: 'products' });

      return response
        .status(200)
        .json({ msg: 'Products for restaurant fetched successfully', data: restaurant });
    } catch (error) {
      return response.status(500).json({
        msg: 'Something went wrong, please try again',
        err: error.message,
      });
    }

  }

  async findAllRestaurants(request: Request, response: Response) {
    try {
      const restaurants = await this.restaurantModel.find();

      return response
        .status(500)
        .json({ msg: 'Get all restaurants successfully', data: restaurants });
    } catch (e) {
      return response.status(500).json({
        msg: 'Something went wrong, please try again',
        err: e.message,
      });
    }
  }

  /*
      Update restaurant service
  */
  updateRestaurantService = async (
    file,
    request: Request,
    response: Response,
  ) => {
    try {
      const { name, address, id } = request.body;
      
      if (!id) {
        return response
          .status(400)
          .json({ msg: 'Please provide restaurant id' });
      }

      if (!ObjectId.isValid(id)) {
        return response.status(400).json({ msg: 'Invalid restaurant id' });
      }

      //Check for restaurant details
      const checkRestaurantDetails = await this.restaurantModel
        .findById(id)
        .lean();
      if (!checkRestaurantDetails) {
        return response.status(404).json({
          msg: 'Restaurant details not found ,please try again later',
        });
      }


      if (request.body.openingHours && !request.body.openingHours.length) {
        return response
          .status(400)
          .json({ msg: 'Please add restaurant opening hours' });
      }

      const restaurantData: any = {
        name: name ? name : checkRestaurantDetails.name,
        address: address ? address : checkRestaurantDetails.address,
        picture: file ? file : checkRestaurantDetails.picture,
      };
      if (file) {
        const imageFilePath = file.path;
        const imageData = await profileUpload(imageFilePath);
        restaurantData.picture = imageData;
      }

      let modifiedOpeningHours: Array<any> = [];
      if (request.body.openingHours && request.body.openingHours.length) {
        for (let k = 0; k < request.body.openingHours.length; k++) {
          modifiedOpeningHours = modifiedOpeningHours.concat(
            JSON.parse(request.body.openingHours[k]),
          );
        }
      }

      if (modifiedOpeningHours.length) {
        restaurantData.openingHours = modifiedOpeningHours;
      }

      const restaurant = await this.restaurantModel.findByIdAndUpdate(
        id,
        restaurantData,
        { new: true },
      );
      return response.status(201).json({
        msg: 'Restaurant details updated successfully',
        data: restaurant,
      });
    } catch (error) {
      return response.status(500).json({
        msg: 'Update to Restaurant details failed',
        err: error.message,
      });
    }
  };
}
