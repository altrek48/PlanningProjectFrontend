import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { DefaultContentComponent } from './first-screen/default-content/default-content.component';
import { CostsScreenComponent } from './costs/costs-screen/costs-screen/costs-screen.component';
import { GroupScreenComponent } from './group-screen/group-screen/group-screen.component';
import { PlansScreenComponent } from './plans/plans-screen/plans-screen/plans-screen.component';
import { SinglePlanComponent } from './plans/single-plan/single-plan/single-plan.component';
import { AllPlansComponent } from './plans/all-plans/all-plans/all-plans.component';
import { LoginScreenComponent } from './login-screen/login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { AllCostsComponent } from './costs/all-costs/all-costs.component';
import { SingleCostComponent } from './costs/single-cost/single-cost.component';


const routes: Routes = [
  { path: 'login', component: LoginScreenComponent},
  { path: 'registration', component: RegisterScreenComponent},
  { path: 'home', component: FirstScreenComponent,
    children: [
      {path: ':groupId', component: GroupScreenComponent,
        children: [
          {path: 'costs', component: CostsScreenComponent,
            children: [
              {path: '', component: AllCostsComponent},
              {path: ':purchaseId', component: SingleCostComponent}
            ]
          },
          {path: 'plans', component: PlansScreenComponent,
            children: [
              {path: '', component: AllPlansComponent},
              {path: 'add', component: SinglePlanComponent},
              {path: ':taskId', component:SinglePlanComponent},
              {path: '**', redirectTo: '', pathMatch: 'full'}
            ]
          },
        ]
      },
      {path: '', component: DefaultContentComponent}
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
