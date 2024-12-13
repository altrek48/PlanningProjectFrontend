import { Component, OnInit } from '@angular/core';
import { ProductInPlane } from 'src/models/productInTask';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-product',
  templateUrl: './dialog-edit-product.component.html',
  styleUrls: ['./dialog-edit-product.component.css']
})
export class DialogEditProductComponent implements OnInit {

  editingProduct: ProductInPlane;

  constructor(public dialogRef: MatDialogRef<DialogEditProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ProductInPlane) {
          this.editingProduct = data ? { ...data } : new ProductInPlane();;
         }

      ngOnInit(): void {
      }

      onNoClick(): void {
        this.dialogRef.close();
      }

      confirmEdit(): void {
        this.dialogRef.close(this.editingProduct);
      }

}
