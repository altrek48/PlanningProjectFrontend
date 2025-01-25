import { DecimalPipe } from "@angular/common";
import { ProductInPlane } from "./productInTask";

export class Task {
  constructor() {
    this.id = null;
    this.name = "";
    this.comment = "";
    this.amount = null;
    this.products = null;
    this.completeness = 0;
    this.linkedPurchasesIds = null;
  }

  id: number | null;
  name: string;
  comment: string | null;
  amount: number | null;
  products: ProductInPlane[] | null;
  completeness: number;
  linkedPurchasesIds: number[] | null;


}
