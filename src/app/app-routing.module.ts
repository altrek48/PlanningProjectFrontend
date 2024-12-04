import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { PlainScreenComponent } from './plain-screen/plain-screen/plain-screen.component';

const routes: Routes = [
  {path: 'groups', component: FirstScreenComponent},
  {path: 'plains', component: PlainScreenComponent},
  {path: '', redirectTo: '/groups', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
