export interface IProduct {
  id: number;
  name: string;
  upc: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  currency: string;
  availableOnline: boolean;
  availableInStore: boolean;
  seller: string;
  sellerId: string;
  customerRating: number;
  numReviews: number;
  thumbnailImage: string;
  largeImage: string;
  categoryName: string;
  brandName: string;
  color: string;
  dimensions: Dimensions;
  discount: Discount;
}

export interface Dimensions {
  width: string;
  height: string;
  depth: string;
}

export interface Discount {
  percent: number;
  startDate: string | null;
  endDate: string | null;
}
