import ICutlist from './ICutlist';
import IOrderStatus from './OrderStatusEnumDTO';
import IOrderStore from './OrderStoreEnumDTO';
import IPaymentStatus from './PaymentStatusEnumDTO';
import DeliveryTypeEnumDTO from './DeliveryTypeEnumDTO';

export default interface IOrder {
  id: string;
  customerId: string;
  orderStore: IOrderStore;
  paymentStatus: IPaymentStatus;
  orderStatus: IOrderStatus;
  seller: string;
  order_code: number;
  ps?: string;
  relatedProblems?: string;
  conclusionDate?: string;
  deliveryDate: string;
  price: number;
  delivery_type: DeliveryTypeEnumDTO;
  cutlist: ICutlist[];
  created_at?: Date;
}
