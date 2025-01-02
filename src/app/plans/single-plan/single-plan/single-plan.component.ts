import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, Params } from '@angular/router';
import { ProductInPlane } from 'src/models/productInTask';
import { ActivatedRoute } from '@angular/router';
import { DialogAddProductComponent } from '../../dialogs/dialog-add-product/dialog-add-product/dialog-add-product.component';
import { Task } from 'src/models/task';
import { BaseService } from 'src/services/base-service';
import { DialogEditProductComponent } from '../../dialogs/dialog-edit-product/dialog-edit-product/dialog-edit-product.component';
import { Location } from '@angular/common';

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
    private location: Location
  ) {
    this.groupId = activateRoute.snapshot.params["groupId"];
    this.task = new Task();
    const state = this.location.getState() as {columns: string[]};
    this.displayedColumns = state.columns;
  }

  ngOnInit(): void {
    //проверка на последний сегмент urlа
   if(this.activateRoute.snapshot.url.slice(-1)[0]?.path === "add") {
    this.displayedColumns = ["name", "actions"];
    this.isAddScreen = true;
   }
   else {
    this.taskId = Number(this.activateRoute.snapshot.url.slice(-1)[0]?.path);
    this.displayedColumns = ["name","price", "actions"];
    this.baseService.getTask(this.taskId).subscribe((task: Task) => {
      this.task = task;
      this.dataSource = new MatTableDataSource<ProductInPlane>(task.products || []);
    })
    this.isAddScreen = false;
   }
    this.activateRoute.parent?.parent?.params.subscribe((params: Params) => {
      this.groupId = +params['groupId'];
    })
  }

  backToPlans() {
    this.router.navigate([`home/${this.groupId}/plans`]);
  }

  addProduct() {
    const dialogRef = this.dialog.open(DialogAddProductComponent, {
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
    const dialogRef = this.dialog.open(DialogEditProductComponent, {
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
    if(this.task.name.length >= 5) {
      this.task.products = this.dataSource.data;
      this.baseService.changeTask(this.task).subscribe(() => {
        this.backToPlans();
      });
    }
    else console.log("task name are too short");
  }

}
