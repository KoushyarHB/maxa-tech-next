export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  role: string;
}

export interface IUserSignInForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface ICartProducts {
  productId: number;
  quantity: number;
  color: string;
}

export interface ICart {
  id: number;
  cartProducts: ICartProducts[];
}

export interface IWishlist {
  id: number;
  wishlistProducts: {
    productId: string;
    quantity: number;
    color: string;
  }[];
}

export interface IOrder {
  orderCode: number;
  orderStatus: string;
  orderPlacementDate: string;
  orderTotal: number;
  orderReceiverName: string;
  orderAddress: string;
  orderPostalCode: string;
  orderPhoneNumber: string;
  // orderPaymentMethod: string;
  // orderTransactionId: number;
  // orderShippingMethod: string;
  orderItems: ICartProducts[];
}

export interface IOrders {
  id: number;
  ordersHistory: IOrder[];
}
