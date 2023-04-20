import {IProductResponse} from "../product/product.interface";
import {Timestamp} from "@angular/fire/firestore";



export interface IOrderRequest {
  order_number: number;
  uid: string;
  date_order: Timestamp;
  total: number;
  status: boolean;
  product: IProductResponse;
  name: string;
  phone: string;
  delivery_method: string;
  payment_method: string;
  at_time: string;
  self_delivery_date: string;
  self_delivery_time: string;
  select_point: number;
  street: string;
  house: string;
  entrance: string;
  flat: string;
  no_call: boolean;
  isComment: boolean;
  comment: string;
  isKitchen_comment: boolean;
  comment_kitchen: string;
  count_thing: number;
  count_thing_study: number;

}

export interface IOrderResponse extends IOrderRequest {
  id: string;
}
