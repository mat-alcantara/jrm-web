import ICutlist from './ICutlist';

export default interface IOrder {
  id: string;
  customerId: string;
  orderStore: string;
  paymentStatus: string;
  orderStatus: string;
  seller: string;
  order_code: number;
  ps?: string;
  relatedProblems?: string;
  conclusionDate?: string;
  deliveryDate: string;
  price: number;
  cutlist: ICutlist[];
}
