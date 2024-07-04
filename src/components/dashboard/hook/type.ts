import { ICartProducts } from "@/layout/navbar/hooks/types";

export interface IDashboardOrder {
  orderAddress: string;
  orderPostalCode: string;
  orderPhoneNumber: string;
  orderCode: number;
  orderItems: ICartProducts[];
  orderPlacementDate: string;
  orderReceiverName: string;
  orderStatus: string;
  orderTotal: number;
  userId: number;
}
