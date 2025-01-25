import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/models/product';
import { Purchase } from 'src/models/purchase';
import { BaseService } from 'src/services/base-service';
import { Location } from '@angular/common';
import { DialogAddProductComponent } from '../dialogs/dialog-add-product/dialog-add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditProductComponent } from '../dialogs/dialog-edit-product/dialog-edit-product.component';

@Component({
  selector: 'app-single-cost',
  templateUrl: './single-cost.component.html',
  styleUrls: ['./single-cost.component.css']
})
export class SingleCostComponent implements OnInit {

  purchase: Purchase;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Product>([]);
  groupId: number;
  purchaseId: number | null = null;
  isAddScreen: boolean = true;
  taskName: string = "";
  taskId: number | null = null;
  //linkedTaskId: number | null = null;


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private baseService: BaseService,

  ) {
    this.purchase = new Purchase();
    this.groupId = activateRoute.snapshot.params["groupId"];
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.taskName = navigation.extras.state['taskName'] || "";
      this.taskId = navigation.extras.state['taskId'] || null;
    }
  }

  ngOnInit(): void {
    this.activateRoute.parent?.parent?.params.subscribe((params: Params) => {
      this.groupId = +params['groupId'];
    });
    this.activateRoute.url.subscribe(() => {
      if(this.activateRoute.snapshot.url.slice(-1)[0]?.path === "add") {
        this.displayedColumns = ["name", "price", "actions"];
        this.purchase = new Purchase()// Очистка при добавлении нового
        this.dataSource = new MatTableDataSource<Product>([]);
        this.isAddScreen = true;
      }
      else {
        this.purchaseId = Number(this.activateRoute.snapshot.url.slice(-1)[0]?.path);
        this.displayedColumns = ["name", "price"];
        this.baseService.getPurchase(this.groupId, this.purchaseId).subscribe((purchase: Purchase) => {
          this.purchase = purchase;
          this.dataSource = new MatTableDataSource<Product>(this.purchase.products || []);
        })
        this.isAddScreen = false;
      }
    })
  }

  backToPurchases() {
    this.router.navigate([`/home/${this.groupId}/costs`]);
  }

  addProduct() {
    const dialogRef = this.dialog.open(DialogAddProductComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result.name.length >= 2 && result.price != null) {
        this.dataSource.data = [...this.dataSource.data, result];
        this.purchase.products = this.dataSource.data;
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(DialogEditProductComponent, {
        width: '400px',
        data: product,
    });

    dialogRef.afterClosed().subscribe((updatedProduct: Product) => {
      Object.assign(product, updatedProduct);
    });
  }

  deleteProduct(product: Product) {
    this.dataSource.data = this.dataSource.data.filter(p => p !== product);
  }

  savePurchase() {
    if(this.purchase.products != null && this.purchase.storeName.length >= 2) {
      if(this.taskId != null && this.taskName != "") {
        this.baseService.createPurchaseInTask(this.purchase, this.groupId, this.taskId).subscribe((createdPurchase: Purchase) => {
          console.log("create linked purchase", createdPurchase);
          this.backToPurchases();
        })
      }
      else {
        this.baseService.addNewPurchase(this.purchase, this.groupId).subscribe(() => {
          this.backToPurchases();
        })
      }
    }
    else console.log("products are null or storeName.length < 2")
  }

  ngOnDestroy(): void {
    this.purchase = new Purchase();
    this.dataSource = new MatTableDataSource<Product>([]);
  }

  routeToLinkedTask(taskId: number) {
    this.router.navigate([`home/${this.groupId}/plans/${taskId}`])
  }

}
