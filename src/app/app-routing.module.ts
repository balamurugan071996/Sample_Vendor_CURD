import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminvendorComponent } from './adminvendor/adminvendor.component';


const routes: Routes = [
  { path: 'adminvendor', component: AdminvendorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
