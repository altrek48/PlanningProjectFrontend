import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-dialog-add-product',
  templateUrl: './dialog-add-product.component.html',
  styleUrls: ['./dialog-add-product.component.css']
})
export class DialogAddProductComponent implements OnInit {

  creatingProduct: Product;
  
  
    constructor(public dialogRef: MatDialogRef<DialogAddProductComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Product) {
        this.creatingProduct = new Product();
       }
  
    ngOnInit(): void {
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
}
