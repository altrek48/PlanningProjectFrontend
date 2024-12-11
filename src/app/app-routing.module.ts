import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { DefaultContentComponent } from './first-screen/default-content/default-content.component';
import { CostsScreenComponent } from './costs-screen/costs-screen/costs-screen.component';
import { GroupScreenComponent } from './group-screen/group-screen/group-screen.component';
import { PlansScreenComponent } from './plans-screen/plans-screen/plans-screen.component';


const routes: Routes = [
  { path: 'home', component: FirstScreenComponent,
    children: [
      {path: ':groupId', component: GroupScreenComponent,
        children: [
          {path: 'costs', component: CostsScreenComponent},
          {path: 'plans', component: PlansScreenComponent}
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
