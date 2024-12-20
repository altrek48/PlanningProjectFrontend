import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { DialogAddGroupComponent } from './first-screen/dialog-add-group/dialog-add-group/dialog-add-group.component';
import { DefaultContentComponent } from './first-screen/default-content/default-content.component';
import { CostsScreenComponent } from './costs/costs-screen/costs-screen/costs-screen.component';
import { GroupScreenComponent } from './group-screen/group-screen/group-screen.component';
import { PlansScreenComponent } from './plans/plans-screen/plans-screen/plans-screen.component';
import { SinglePlanComponent } from './plans/single-plan/single-plan/single-plan.component';
import { AllPlansComponent } from './plans/all-plans/all-plans/all-plans.component';
import { DialogAddProductComponent } from './plans/dialogs/dialog-add-product/dialog-add-product/dialog-add-product.component';
import { DialogEditProductComponent } from './plans/dialogs/dialog-edit-product/dialog-edit-product/dialog-edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstScreenComponent,
    DialogAddGroupComponent,
    DefaultContentComponent,
    CostsScreenComponent,
    GroupScreenComponent,
    PlansScreenComponent,
    SinglePlanComponent,
    AllPlansComponent,
    DialogAddProductComponent,
    DialogEditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
