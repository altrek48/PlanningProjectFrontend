import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/models/product';
import { Purchase } from 'src/models/purchase';
import { BaseService } from 'src/services/base-service';

@Component({
  selector: 'app-single-cost',
  templateUrl: './single-cost.component.html',
  styleUrls: ['./single-cost.component.css']
})
export class SingleCostComponent implements OnInit {

  purchase: Purchase;
  displayedColumns: string[] = ["Название товара", "Цена"];
  dataSource = new MatTableDataSource<Product>([]);
  groupId: number;
  purchaseId: number | null = null;
  isAddScreen: boolean = true;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private baseService: BaseService,

  ) {
    this.purchase = new Purchase();
    this.groupId = activateRoute.snapshot.params["groupId"];
  }

  ngOnInit(): void {
    if(this.activateRoute.snapshot.url.slice(-1)[0]?.path === "add") {
      this.isAddScreen = true;
    }
    else {
        this.purchaseId = Number(this.activateRoute.snapshot.url.slice(-1)[0]?.path);
        this.baseService.getPurchase(this.purchaseId).subscribe((purchase: Purchase) => {
          this.purchase = purchase;
          this.dataSource = new MatTableDataSource<Product>(this.purchase.products || []);
        })
        this.isAddScreen = false;
    }
    this.activateRoute.parent?.parent?.params.subscribe((params: Params) => {
      this.groupId = +params['groupId'];
    })
  }

}
