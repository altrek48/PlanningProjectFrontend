import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/models/purchase';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from 'src/services/base-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-costs',
  templateUrl: './all-costs.component.html',
  styleUrls: ['./all-costs.component.css']
})
export class AllCostsComponent implements OnInit {

  groupId: number;
    displayedColumns: string[] = ["Магазин", "Дата", "Покупатель", "Цена"];
    dataSource = new MatTableDataSource<Purchase>([]);
    purchases: Purchase[] | null = null;
    subscription: Subscription | null | undefined = null; // для отписки
  
    constructor(
      private baseService: BaseService,
      private router: Router,
      private activateRoute: ActivatedRoute,
    ) {
      this.groupId = activateRoute.snapshot.params["groupId"];
     }
  
    ngOnInit(): void {
      this.subscription = this.activateRoute.parent?.parent?.params.subscribe((params: Params) => {
        this.groupId = +params['groupId'];
        this.loadPurchases();
      });
    }
  
    loadPurchases() {
      this.baseService.getAllPurchasesByGroupId(this.groupId).subscribe(data => {
        this.purchases = data;
        this.dataSource = new MatTableDataSource<Purchase>(this.purchases || []);
        console.log(this.purchases);
      })
    }
  
    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }

    routeToThisPlan(purchaseId: number | null) {
      if(purchaseId === null) {
        console.log("Id покупки === null");
      }
      else this.router.navigate([`home/${this.groupId}/costs/${purchaseId}`]);
    }

}
