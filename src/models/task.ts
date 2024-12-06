import { ProductInPlane } from "./productInTask";

export class Task {
  constructor() {
    this.id = null;
    this.name = "";
    this.comment = "";
    this.amount = null;
    this.products = null;
  }

  id: number | null;
  name: string;
  comment: string | null;
  amount: number | null;
  products: Array<ProductInPlane> | null;
  //доделать для purchasesIds


}
