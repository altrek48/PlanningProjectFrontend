import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { PlainScreenComponent } from './plain-screen/plain-screen/plain-screen.component';
import { DefaultContentComponent } from './first-screen/default-content/default-content.component';
import { CostsScreenComponent } from './costs-screen/costs-screen/costs-screen.component';


const routes: Routes = [
  { path: 'home', component: FirstScreenComponent,
    children: [
      {path: 'groups/:groupId', component: PlainScreenComponent,
        children: [
          {path: 'costs/:groupId', component: CostsScreenComponent}
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
