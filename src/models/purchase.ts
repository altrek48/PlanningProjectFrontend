import { Product } from "./product";

export class Purchase {
  constructor() {
    this.id = null;
    this.storeName = "";
    this.amount = null;
    this.products = null;
    this.date = null;

  }

  id: number | null;
  storeName: string;
  date: Date | null;
  amount: number | null;
  products: Product[] | null;


}