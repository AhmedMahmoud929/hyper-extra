export interface Product {
  _id: string;
  name: string;
  category: Category;
  description: string;
  image: string;

  price: number;
  offer: boolean;
  priceAfterDiscount: number;

  quantity: number;
  sales: number;
  remainingProducts: number;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
}

/*
  quantity: 0
  _id: "6719728d4768f2487c32bc6b"
  name: "product offer"
  category
  price: 335
  offer: true
  discount: 15
  description: "this is the description of product 1"
  image: "image 1"
  priceAfterDiscount: 284.75
  __v: 0
 */
