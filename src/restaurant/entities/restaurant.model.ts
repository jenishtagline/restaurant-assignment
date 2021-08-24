export interface RestaurantModel {
  picture: string; //Restaurant picture
  name: string; //Restaurant name
  address: string; //Restaurant address
  openingHours: [RestaurantOpeningHours]; //Restaurant hours
}

//Opening and closing hours
export interface RestaurantOpeningHours {
  day: string;
  openingTime: string;
  closingTime: string;
}
