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

@Component({
  selector: 'app-single-plan',
  templateUrl: './single-plan.component.html',
  styleUrls: ['./single-plan.component.css']
})
export class SinglePlanComponent implements OnInit {

  task: Task;
  displayedColumns: string[] = [ 'name', 'actions'];
  dataSource = new MatTableDataSource<ProductInPlane>([]);
  groupId: number;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private baseService: BaseService
  ) {
    this.groupId = activateRoute.snapshot.params["groupId"];
    this.task = new Task();
  }

  ngOnInit(): void {
    this.activateRoute.parent?.parent?.params.subscribe((params: Params) => {
      this.groupId = +params['groupId'];
    })
  }

  backToPlans() {
    this.router.navigate([`home/${this.groupId}/plans`]);
  }

  openAddProductDialog() {
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
      //todo closure или замыкания
      debugger;
      console.log(`${product.name}`);

      //???????
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
}
