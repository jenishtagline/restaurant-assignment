## Description
Technologies:
1) NestJs
2) MongoDB

## Installation

bash
$ npm install


## set-up database
create a .env file and set mongodb connection
MONGODB_URL=mongodb://localhost:27018/restaurant-app

## Running the app watch mode
$ npm run start:dev


api's
1) create Restaurant -- '/restaurant/register'
2) get all product from restaurant -- '/restaurant/products'
3) get all the restaurants -- 'restaurant/list'
4) update restaurant data -- 'restaurant/update'
5) create product for restaurant -- '/product/create'
6) update product for restaurant -- '/product/update'
7) delete product for restaurant -- '/product/delete'

We have uploded all the images in cloudinary so that you can see the images you are uploading for that you need to create account in cloudinary and create a folder name "restaurant"


put your cloudinary secret credentials like
Cloud Name:************
API Key: 457398846646854
API Secret:	***************************
