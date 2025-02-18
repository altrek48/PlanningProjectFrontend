import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, Params } from '@angular/router';
import { ProductInPlane } from 'src/models/productInTask';
import { ActivatedRoute } from '@angular/router';
import { DialogAddProductInPlaneComponent } from '../../dialogs/dialog-add-product/dialog-add-product/dialog-add-product.component';
import { Task } from 'src/models/task';
import { BaseService } from 'src/services/base-service';
import { DialogEditProductInPlaneComponent } from '../../dialogs/dialog-edit-product/dialog-edit-product/dialog-edit-product.component';
import { Location } from '@angular/common';
import { UrlSegment } from '@angular/router';
import { DialogDeletePlanComponent } from '../../dialogs/dialog-delete-plan/dialog-delete-plan/dialog-delete-plan.component';

@Component({
  selector: 'app-single-plan',
  templateUrl: './single-plan.component.html',
  styleUrls: ['./single-plan.component.css']
})
export class SinglePlanComponent implements OnInit {

  task: Task;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<ProductInPlane>([]);
  groupId: number;
  taskId: number | null = null;
  isAddScreen: boolean = true;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private baseService: BaseService,
  ) {
    this.groupId = activateRoute.snapshot.params["groupId"];
    this.task = new Task();
  }

  ngOnInit(): void {
    this.activateRoute.parent?.parent?.params.subscribe((params: Params) => {
      this.groupId = +params['groupId'];
    });
    //проверка на последний сегмент urlа
   if(this.activateRoute.snapshot.url.slice(-1)[0]?.path === "add") {
    this.displayedColumns = ["name", "actions"];
    this.isAddScreen = true;
   }
   else {
    this.taskId = Number(this.activateRoute.snapshot.url.slice(-1)[0]?.path);
    this.displayedColumns = ["name","price", "purchase", "actions"];
    this.baseService.getTask(this.groupId, this.taskId).subscribe((task: Task) => {
      this.task = task;
      this.dataSource = new MatTableDataSource<ProductInPlane>(task.products || []);
    })
    this.isAddScreen = false;
   }
  }

  backToPlans() {
    this.router.navigate([`home/${this.groupId}/plans`]);
  }

  addProduct() {
    const dialogRef = this.dialog.open(DialogAddProductInPlaneComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: ProductInPlane) => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
        this.task.products = this.dataSource.data;
      }
    });
  }

  editProduct(product: ProductInPlane) {
    const dialogRef = this.dialog.open(DialogEditProductInPlaneComponent, {
      width: '400px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((updatedProduct: ProductInPlane) => {
      Object.assign(product, updatedProduct);
    });
  }

  deleteProduct(product: ProductInPlane) {
    this.dataSource.data = this.dataSource.data.filter(p => p !== product);
  }

  savePlan() {
    if(this.task.name.length >= 5) {
      this.baseService.addNewTask(this.task, this.groupId).subscribe(() => {
        this.backToPlans();
      });
    }
    else console.log("task name are too short");
  }

  changePlan() {
    if(this.task.name.length >= 5 && this.taskId) {
      this.task.products = this.dataSource.data;
      this.baseService.changeTask(this.task, this.groupId, this.taskId).subscribe(() => {
        this.backToPlans();
      });
    }
    else console.log("task name are too short or taskId == null");
  }

  deletePlan() {
    const dialogRef = this.dialog.open(DialogDeletePlanComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result === true && this.taskId != null) {
        this.baseService.deleteTask(this.groupId, this.taskId).subscribe((id: Number) => {
          console.log("task with id: " + id + " was deleted");
        })
        this.backToPlans();
      }
    });
  }

  addLinkedPurchase() {
    this.router.navigate([`home/${this.groupId}/costs/add`], {
      state: { taskName: this.task.name, taskId: this.taskId }
    });
  }

  navigateToLinkedPurchase(productId: number) {
    var purchaseId = this.baseService.getPurchaseIdByProductId(productId).subscribe((purchaseId: number) => {
      if(purchaseId != null) {
        this.router.navigate([`home/${this.groupId}/costs/${purchaseId}`]);
      }
    })
  }

}
